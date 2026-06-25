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
    {
      id: 'ant-2',
      role: 'user',
      content:
        "Some students will use guess and check. Others will try inverse operations. A common mistake I see is not applying the operation to both sides of the equation.",
    },
    {
      id: 'ant-3',
      role: 'assistant',
      content:
        "Those are valuable observations. Do you anticipate students struggling with negative coefficients, or multi-step equations where they need to distribute first?",
    },
  ],
  monitor: [
    {
      id: 'mon-1',
      role: 'assistant',
      content:
        'As students work on the task, what specific things will you look for to understand their mathematical thinking?',
    },
    {
      id: 'mon-2',
      role: 'user',
      content:
        "I'll look for whether they set up the equation correctly and whether they show each step clearly. I'll ask: 'What does this step do to both sides?'",
    },
    {
      id: 'mon-3',
      role: 'assistant',
      content:
        'Good. Consider making a monitoring chart listing the strategies you anticipated, with space to note which students used each approach. That will make selecting and sequencing much easier.',
    },
  ],
  selecting: [
    {
      id: 'sel-1',
      role: 'assistant',
      content:
        'Based on your monitoring plan, which 2–3 student work samples would be most valuable to share with the whole class? What criteria will guide your selection?',
    },
    {
      id: 'sel-2',
      role: 'user',
      content:
        'I want to show a guess-and-check approach first, then a table of values, and finally the algebraic method so students can see a progression in formality.',
    },
    {
      id: 'sel-3',
      role: 'assistant',
      content:
        "That's a thoughtful selection. Would you also consider including a work sample that shows a common error? Examining mistakes publicly can be a powerful learning opportunity.",
    },
  ],
  sequencing: [
    {
      id: 'seq-1',
      role: 'assistant',
      content:
        "Now let's plan the sequence. In what order will students present, and what questions will you ask to help the class connect each approach to the next?",
    },
    {
      id: 'seq-2',
      role: 'user',
      content:
        "Guess-and-check first to honor informal strategies, then table of values, then the algebraic approach last as the most formal. Between each I'll ask: 'What do you notice?'",
    },
    {
      id: 'seq-3',
      role: 'assistant',
      content:
        "Excellent sequencing — you're building conceptual understanding before formalizing the procedure. What discussion moves will you use to help students articulate the connections between methods?",
    },
  ],
  connecting: [
    {
      id: 'con-1',
      role: 'assistant',
      content:
        "You've planned all five practices. Let's bring the lesson together. How will you close the discussion and connect student work back to the core learning goal?",
    },
    {
      id: 'con-2',
      role: 'user',
      content:
        "I'll end with a whole-class question: 'What do all these methods have in common? What does it really mean to solve an equation?' and chart their ideas on the board.",
    },
    {
      id: 'con-3',
      role: 'assistant',
      content:
        'Perfect. That question surfaces the big idea across all representations. Your lesson plan is complete and ready to download below.',
    },
  ],
}
