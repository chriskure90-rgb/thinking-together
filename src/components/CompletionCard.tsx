interface CompletionCardProps {
  stepLabel: string
  onViewPlan: () => void
}

export default function CompletionCard({ stepLabel, onViewPlan }: CompletionCardProps) {
  return (
    <div className="flex justify-center px-6">
      <div className="border border-green-200 bg-green-50 rounded-2xl px-8 py-5 text-center w-full max-w-sm">
        <p className="text-[13px] font-semibold text-green-700 mb-1">
          {stepLabel} complete
        </p>
        <p className="text-[12px] text-gray-500 mb-3 leading-relaxed">
          Your planning notes for this section have been saved to your lesson plan.
        </p>
        <button
          type="button"
          onClick={onViewPlan}
          className="text-[13px] text-indigo-600 underline font-medium hover:text-indigo-800 transition-colors"
        >
          Review lesson plan
        </button>
      </div>
    </div>
  )
}
