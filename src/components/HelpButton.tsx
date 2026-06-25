import { HelpCircle } from 'lucide-react'

export default function HelpButton() {
  return (
    <button
      type="button"
      className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors z-50"
      title="Help"
    >
      <HelpCircle className="w-5 h-5" />
    </button>
  )
}
