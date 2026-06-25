interface CurrentFocusBannerProps {
  step: string
  hint: string
}

export default function CurrentFocusBanner({ step, hint }: CurrentFocusBannerProps) {
  return (
    <div className="mx-6 mt-4 mb-2 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
      <span className="text-[12px] font-semibold text-indigo-500 tracking-wide">
        Current Focus
      </span>
      <span className="text-gray-300 text-sm">|</span>
      <span className="text-[13px] font-semibold text-gray-700">{step}</span>
      <span className="text-gray-300 text-sm">|</span>
      <span className="text-[13px] text-gray-400">{hint}</span>
    </div>
  )
}
