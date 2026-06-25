export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  kind?: 'text' | 'completion'
  stepLabel?: string
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-6`}>
      <div
        className={`
          max-w-[72%] rounded-2xl px-5 py-3.5 text-[14px] leading-relaxed
          ${isUser
            ? 'bg-indigo-600 text-white rounded-br-sm'
            : 'bg-white text-gray-700 rounded-bl-sm border border-gray-100 shadow-sm'
          }
        `}
      >
        {message.content}
      </div>
    </div>
  )
}
