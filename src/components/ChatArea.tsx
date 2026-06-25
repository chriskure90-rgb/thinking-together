import { useEffect, useRef } from 'react'
import MessageBubble, { type Message } from './MessageBubble'
import CompletionCard from './CompletionCard'
import TypingIndicator from './TypingIndicator'

interface ChatAreaProps {
  messages: Message[]
  isWaiting: boolean
  onViewPlan: () => void
}

export default function ChatArea({ messages, isWaiting, onViewPlan }: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isWaiting])

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-4 py-4">
      {messages.map((msg) =>
        msg.kind === 'completion' ? (
          <CompletionCard
            key={msg.id}
            stepLabel={msg.stepLabel ?? ''}
            onViewPlan={onViewPlan}
          />
        ) : (
          <MessageBubble key={msg.id} message={msg} />
        )
      )}

      {isWaiting && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  )
}
