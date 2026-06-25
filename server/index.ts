import { config } from 'dotenv'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// Resolve .env from project root regardless of where the process is started from
const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env') })

import express from 'express'
import { Mistral } from '@mistralai/mistralai'

const app = express()

app.use(express.json())

// ── System prompt ──────────────────────────────────────────────────────────────
const BASE_SYSTEM_INSTRUCTION =
  'You are an AI assistant helping teachers plan math lessons using the Thinking Through a Lesson Protocol (TTLP). Ask one focused question at a time. Keep responses concise, supportive, and aligned with math lesson planning.'

const STEP_CONTEXT: Record<string, string> = {
  'task-selection':
    'The teacher is on Step 0: Task Selection. Help them identify the math task, grade level, and learning goals.',
  anticipation:
    'The teacher is on Practice 1: Anticipation. Help them anticipate student strategies and common misconceptions.',
  monitor:
    'The teacher is on Practice 2: Monitor. Help them plan what to look for as students work and what questions to ask.',
  selecting:
    'The teacher is on Practice 3: Selecting. Help them choose which student work samples to share with the class.',
  sequencing:
    'The teacher is on Practice 4: Sequencing. Help them decide the order in which to present student work.',
  connecting:
    'The teacher is on Practice 5: Connecting. Help them plan how to connect student presentations to the lesson learning goal.',
}

const MODEL = 'mistral-small-latest'

// ── Task Selection: structured JSON extraction ─────────────────────────────────
const TASK_SELECTION_SYSTEM = `You are an AI assistant helping teachers plan math lessons using the Thinking Through a Lesson Protocol (TTLP).

The teacher will describe a lesson in one or two sentences. Your job is to generate the Task Selection section of their TTLP lesson plan from that description.

Always respond with a single valid JSON object — no text outside the JSON:
{
  "message": "A warm 2-sentence summary of what you generated, ending with an invitation to move on to the Anticipation step.",
  "lessonPlan": {
    "gradeLevel": "The grade level inferred from the prompt (e.g., '4th Grade')",
    "learningGoals": "2–4 learning goals, one per line, each starting with '• '",
    "taskDescription": "A specific, grade-appropriate open-ended math task that can be solved in multiple ways.",
    "taskLaunch": "How the teacher will introduce the task: the context, opening question, or setup posed to students."
  }
}

If the teacher's message contains follow-up questions or edits, update the JSON accordingly and keep the same format.`

function safeParseJson(text: string): unknown {
  try { return JSON.parse(text) } catch { /* empty */ }
  const match = text.match(/\{[\s\S]*\}/)
  if (match) { try { return JSON.parse(match[0]) } catch { /* empty */ } }
  return null
}

// ── Types ──────────────────────────────────────────────────────────────────────
interface IncomingMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface RequestBody {
  messages: IncomingMessage[]
  stepId?: string
}

// ── /api/chat ──────────────────────────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, stepId } = req.body as RequestBody

    const apiKey = process.env.MISTRAL_API_KEY
    if (!apiKey) {
      res.status(500).json({ error: 'MISTRAL_API_KEY is not set on the server.' })
      return
    }

    // Filter to user/assistant turns only, starting from the first user turn
    const turns = messages
      .filter((m) => (m.role === 'user' || m.role === 'assistant') && m.content.trim())
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

    const firstUserIdx = turns.findIndex((t) => t.role === 'user')
    const history = firstUserIdx >= 0 ? turns.slice(firstUserIdx) : turns

    if (history.length === 0) {
      res.status(400).json({ error: 'No valid messages to send.' })
      return
    }

    const client = new Mistral({ apiKey })

    // Task Selection: request JSON so we can extract structured lesson plan fields
    if (stepId === 'task-selection') {
      const response = await client.chat.complete({
        model: MODEL,
        messages: [{ role: 'system', content: TASK_SELECTION_SYSTEM }, ...history],
      })
      const raw =
        typeof response.choices?.[0]?.message?.content === 'string'
          ? response.choices[0].message.content
          : ''
      const parsed = safeParseJson(raw) as { message?: string; lessonPlan?: object } | null
      if (parsed?.message && parsed?.lessonPlan) {
        res.json({ text: parsed.message, lessonPlanUpdate: parsed.lessonPlan })
      } else {
        res.json({ text: raw })
      }
      return
    }

    // All other steps: regular chat
    const stepContext = STEP_CONTEXT[stepId ?? ''] ?? ''
    const systemText = stepContext
      ? `${BASE_SYSTEM_INSTRUCTION}\n\n${stepContext}`
      : BASE_SYSTEM_INSTRUCTION

    const response = await client.chat.complete({
      model: MODEL,
      messages: [{ role: 'system', content: systemText }, ...history],
    })

    const text =
      typeof response.choices?.[0]?.message?.content === 'string'
        ? response.choices[0].message.content
        : ''

    res.json({ text })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    const isQuota =
      message.includes('429') ||
      message.includes('rate_limit') ||
      message.includes('quota') ||
      message.includes('Too Many Requests')

    if (isQuota) {
      console.error(`[/api/chat] Rate limit for model "${MODEL}":`, message)
      res.status(429).json({
        error: 'The AI service is currently rate-limited. Please wait a moment and try again.',
      })
    } else {
      console.error('[/api/chat]', message)
      res.status(500).json({ error: message })
    }
  }
})

// ── Start ──────────────────────────────────────────────────────────────────────
const PORT = Number(process.env.PORT ?? 3001)
app.listen(PORT, () => {
  console.log(`API server → http://localhost:${PORT}`)
  console.log(`Model      → ${MODEL}`)
  console.log(`MISTRAL_API_KEY exists: ${!!process.env.MISTRAL_API_KEY}`)
})
