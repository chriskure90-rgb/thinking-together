import { Lightbulb, Eye, PenLine, AlignLeft, Link2, FileText } from 'lucide-react'
import type { StepConfig } from '../types/steps'
import type { Message } from '../components/MessageBubble'

export const STEPS: StepConfig[] = [
  {
    id: 'task-selection',
    label: 'Task Selection',
    section: 'getting-started',
    stepNumber: 0,
    icon: FileText,
    bannerHint: 'Describe your lesson in one sentence — the AI will build your Task Selection.',
    contentType: 'chat',
  },
  {
    id: 'anticipation',
    label: 'Anticipation',
    section: 'five-practices',
    icon: Lightbulb,
    bannerHint: 'How might students approach this task? What strategies will they use?',
    contentType: 'chat',
  },
  {
    id: 'monitor',
    label: 'Monitor',
    section: 'five-practices',
    icon: Eye,
    bannerHint: 'What will you look for as students work? What questions will you ask?',
    contentType: 'chat',
  },
  {
    id: 'selecting',
    label: 'Selecting',
    section: 'five-practices',
    icon: PenLine,
    bannerHint: 'Which student work samples will you share with the class, and why?',
    contentType: 'chat',
  },
  {
    id: 'sequencing',
    label: 'Sequencing',
    section: 'five-practices',
    icon: AlignLeft,
    bannerHint: 'In what order will students share their work? What is your rationale?',
    contentType: 'chat',
  },
  {
    id: 'connecting',
    label: 'Connecting',
    section: 'five-practices',
    icon: Link2,
    bannerHint: 'How will you connect student presentations back to the learning goal?',
    contentType: 'final-plan',
  },
]

export const STEP_INITIAL_MESSAGES: Record<string, Message[]> = {
  'task-selection': [
    {
      id: 'ts-welcome',
      role: 'assistant',
      content:
        'Describe the lesson you want to plan. One sentence is enough — for example: "Teach 4th grade fractions" or "Algebra lesson for 8th grade."',
    },
  ],
  anticipation: [
    {
      id: 'ant-1',
      role: 'assistant',
      content:
        "Now let's think about how your students might approach this task. What strategies do you expect to see? Consider both correct approaches and common misconceptions.",
    },
  ],
  monitor: [
    {
      id: 'mon-1',
      role: 'assistant',
      content:
        'As students work on the task, what specific things will you look for to understand their mathematical thinking?',
    },
  ],
  selecting: [
    {
      id: 'sel-1',
      role: 'assistant',
      content:
        'Based on your monitoring plan, which 2–3 student work samples would be most valuable to share with the whole class? What criteria will guide your selection?',
    },
  ],
  sequencing: [
    {
      id: 'seq-1',
      role: 'assistant',
      content:
        "Now let's plan the sequence. In what order will students present, and what questions will you ask to help the class connect each approach to the next?",
    },
  ],
  connecting: [
    {
      id: 'con-1',
      role: 'assistant',
      content:
        "You've planned all five practices. Let's bring the lesson together. How will you close the discussion and connect student work back to the core learning goal?",
    },
  ],
}
