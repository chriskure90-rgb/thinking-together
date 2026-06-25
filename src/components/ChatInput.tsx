import { useState, useRef, type KeyboardEvent } from 'react'
import { Upload, Mic, Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleSend() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleInput() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`
  }

  return (
    <div className="border-t border-gray-100 bg-white px-6 pt-4 pb-5">
      <div className="flex items-end gap-3 border border-gray-200 rounded-2xl px-3 py-2.5 bg-gray-50 shadow-sm">
        {/* Upload */}
        <button
          type="button"
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          title="Upload file"
        >
          <Upload className="w-4 h-4" />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          className="flex-1 resize-none bg-transparent text-[14px] text-gray-700 placeholder-gray-400 outline-none leading-relaxed max-h-[140px] disabled:opacity-50"
          placeholder="Upload a task or start typing..."
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        />

        {/* Mic */}
        <button
          type="button"
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          title="Voice input"
        >
          <Mic className="w-4 h-4" />
        </button>

        {/* Send */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          title="Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      <p className="text-center text-[12px] text-gray-400 mt-2.5">
        Tip: You can type, upload a file, or use the microphone.
      </p>
    </div>
  )
}
