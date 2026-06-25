import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import CurrentFocusBanner from './components/CurrentFocusBanner'
import ChatArea from './components/ChatArea'
import ChatInput from './components/ChatInput'
import FinalPlanView from './components/FinalPlanView'
import LessonPlanModal from './components/LessonPlanModal'
import ErrorBoundary from './components/ErrorBoundary'
import { type Message } from './components/MessageBubble'
import { STEPS, STEP_INITIAL_MESSAGES } from './data/steps'
import { downloadLessonPlanDocx } from './utils/exportDocx'
import type { LessonPlanData } from './types/lessonPlan'
import type { StepId } from './types/steps'

const EMPTY_LESSON_PLAN: LessonPlanData = {
  learningGoals: '',
  gradeLevel: '',
  taskDescription: '',
  taskLaunch: '',
  anticipatedStrategies: [],
  tentativeSequencing: '',
  tentativeSequencingDetails: '',
  mathematicalConnections: '',
  mathematicalConnectionsDetails: '',
}

type MessageStore = Record<StepId, Message[]>

function buildInitialMessages(): MessageStore {
  return Object.fromEntries(
    STEPS.map((s) => [s.id, STEP_INITIAL_MESSAGES[s.id] ?? []])
  ) as MessageStore
}

function getNextStepId(currentId: StepId): StepId | null {
  const idx = STEPS.findIndex((s) => s.id === currentId)
  return idx !== -1 && idx < STEPS.length - 1 ? STEPS[idx + 1].id : null
}

const FIVE_PRACTICE_IDS: StepId[] = ['anticipation', 'monitor', 'selecting', 'sequencing', 'connecting']

export default function App() {
  const [currentStepId, setCurrentStepId] = useState<StepId>('task-selection')
  const [messagesByStep, setMessagesByStep] = useState<MessageStore>(buildInitialMessages)
  const [completedSteps, setCompletedSteps] = useState<Set<StepId>>(new Set())
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [lessonPlan, setLessonPlan] = useState<LessonPlanData>(EMPTY_LESSON_PLAN)

  const currentStep = STEPS.find((s) => s.id === currentStepId)!
  const messages = messagesByStep[currentStepId]

  const completedPracticesCount = FIVE_PRACTICE_IDS.filter((id) => completedSteps.has(id)).length
  const hasLessonPlan = !!(lessonPlan.learningGoals?.trim() || lessonPlan.taskDescription?.trim())

  function appendToStep(stepId: StepId, msgs: Message[]) {
    setMessagesByStep((prev) => ({
      ...prev,
      [stepId]: [...prev[stepId], ...msgs],
    }))
  }

  async function handleSend(text: string) {
    if (isWaiting) return

    const userMsg: Message = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: text,
    }

    const updatedMessages = [...messagesByStep[currentStepId], userMsg]
    appendToStep(currentStepId, [userMsg])
    setIsWaiting(true)

    const stepId = currentStepId
    const step = currentStep

    try {
      const apiMessages = updatedMessages
        .filter(
          (m) =>
            (m.role === 'user' || m.role === 'assistant') &&
            !m.kind &&
            m.content.trim()
        )
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, stepId }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error ?? `HTTP ${res.status}`)
      }

      const { text: aiText, lessonPlanUpdate } = await res.json()

      if (lessonPlanUpdate && typeof lessonPlanUpdate === 'object') {
        setLessonPlan((prev) => ({ ...prev, ...(lessonPlanUpdate as Partial<LessonPlanData>) }))
      }

      const aiMsg: Message = {
        id: `${Date.now()}-ai`,
        role: 'assistant',
        content: aiText,
      }

      const msgsToAdd: Message[] = [aiMsg]

      if (!completedSteps.has(stepId)) {
        msgsToAdd.push({
          id: `${Date.now()}-completion`,
          role: 'system',
          kind: 'completion',
          content: '',
          stepLabel: step.label,
        })
        setCompletedSteps((prev) => new Set([...prev, stepId]))
      }

      appendToStep(stepId, msgsToAdd)
    } catch (err) {
      appendToStep(stepId, [
        {
          id: `${Date.now()}-error`,
          role: 'assistant',
          content: `I'm having trouble connecting right now. Please try again. (${err instanceof Error ? err.message : 'Request failed'})`,
        },
      ])
    } finally {
      setIsWaiting(false)
    }
  }

  function handleProceed() {
    setShowPlanModal(false)
    const next = getNextStepId(currentStepId)
    if (next) setCurrentStepId(next)
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      <Sidebar
        currentStepId={currentStepId}
        onStepChange={setCurrentStepId}
        onDownload={() => downloadLessonPlanDocx(lessonPlan)}
        hasLessonPlan={hasLessonPlan}
        completedCount={completedPracticesCount}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <Header />

        <CurrentFocusBanner
          step={currentStep.label}
          hint={currentStep.bannerHint}
        />

        {currentStep.contentType === 'final-plan' ? (
          <FinalPlanView data={lessonPlan} />
        ) : (
          <>
            <ChatArea
              messages={messages}
              isWaiting={isWaiting}
              onViewPlan={() => setShowPlanModal(true)}
            />
            <ChatInput onSend={handleSend} disabled={isWaiting} />
          </>
        )}
      </div>

      {showPlanModal && (
        <ErrorBoundary>
          <LessonPlanModal
            data={lessonPlan}
            onClose={() => setShowPlanModal(false)}
            onProceed={handleProceed}
          />
        </ErrorBoundary>
      )}
    </div>
  )
}
