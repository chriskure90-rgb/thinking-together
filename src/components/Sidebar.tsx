import { Download, FileText } from 'lucide-react'
import { STEPS } from '../data/steps'
import type { StepId } from '../types/steps'

interface SidebarProps {
  currentStepId: StepId
  onStepChange: (id: StepId) => void
  onDownload: () => void
  hasLessonPlan: boolean
  completedCount: number
}

export default function Sidebar({ currentStepId, onStepChange, onDownload, hasLessonPlan, completedCount }: SidebarProps) {
  const gettingStarted = STEPS.filter((s) => s.section === 'getting-started')
  const practices = STEPS.filter((s) => s.section === 'five-practices')

  return (
    <aside className="w-[240px] min-w-[240px] h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <h2 className="text-[13px] font-semibold text-gray-800 tracking-wide uppercase">
          Planning Progress
        </h2>
      </div>

      {/* Getting Started */}
      <div className="px-4 pb-2">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
          Getting Started
        </p>
        {gettingStarted.map((step) => {
          const isActive = currentStepId === step.id
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepChange(step.id)}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                isActive ? 'bg-indigo-50' : 'hover:bg-gray-50'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                  isActive ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              >
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <p
                  className={`text-[10px] font-medium ${
                    isActive ? 'text-indigo-500' : 'text-gray-400'
                  }`}
                >
                  Step {step.stepNumber}
                </p>
                <p
                  className={`text-[13px] font-semibold ${
                    isActive ? 'text-gray-800' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Five Practices */}
      <div className="px-4 pt-3 pb-2">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Five Practices
        </p>
        <ul className="flex flex-col gap-1">
          {practices.map((step) => {
            const isActive = currentStepId === step.id
            const Icon = step.icon!
            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => onStepChange(step.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-gray-800'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? 'text-indigo-600' : ''
                    }`}
                  />
                  <span
                    className={`text-[13px] ${
                      isActive ? 'font-semibold text-gray-800' : 'font-medium'
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Progress Indicator */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-3 border border-green-300 rounded-lg px-3 py-2.5 bg-white">
          <div className="w-9 h-9 rounded-full border-2 border-green-400 flex items-center justify-center flex-shrink-0">
            <span className="text-[11px] font-bold text-green-500">{completedCount}/5</span>
          </div>
          <span className="text-[12px] text-gray-500 font-medium leading-tight">
            {completedCount} of 5 Practices Complete
          </span>
        </div>
      </div>

      {/* Download */}
      <div className="px-4 pb-5">
        <button
          type="button"
          disabled={!hasLessonPlan}
          onClick={onDownload}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border bg-white transition-colors ${
            hasLessonPlan
              ? 'border-indigo-300 cursor-pointer hover:bg-indigo-50'
              : 'border-gray-200 cursor-not-allowed opacity-60'
          }`}
        >
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            <Download
              className={`w-4 h-4 ${hasLessonPlan ? 'text-indigo-600' : 'text-gray-500'}`}
            />
          </div>
          <div>
            <p
              className={`text-[13px] font-semibold ${
                hasLessonPlan ? 'text-indigo-700' : 'text-gray-700'
              }`}
            >
              Download Lesson Plan
            </p>
            <p className="text-[10px] text-gray-400">
              {hasLessonPlan
                ? 'Your lesson plan is ready!'
                : 'Available after planning is complete'}
            </p>
          </div>
        </button>
      </div>
    </aside>
  )
}
