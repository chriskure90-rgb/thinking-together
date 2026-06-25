export default function TypingIndicator() {
  return (
    <div className="flex justify-start px-6">
      <div className="rounded-2xl rounded-bl-sm px-5 py-4 bg-white border border-gray-100 shadow-sm flex items-center gap-1.5">
        <span
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: '160ms' }}
        />
        <span
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: '320ms' }}
        />
      </div>
    </div>
  )
}
