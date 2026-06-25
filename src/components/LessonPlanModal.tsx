import { X } from 'lucide-react'
import type { LessonPlanData } from '../types/lessonPlan'

interface LessonPlanModalProps {
  data?: LessonPlanData | null
  onClose: () => void
  onProceed: () => void
}

const STRATEGY_ROWS = 5

const TD = 'border border-gray-900 p-4 align-top text-[13.5px] leading-relaxed text-gray-800'
const TH = 'border border-gray-900 p-3 font-bold text-center text-[13px] align-middle bg-white'

function normalizePlan(data?: LessonPlanData | null): LessonPlanData {
  return {
    learningGoals: data?.learningGoals ?? '',
    gradeLevel: data?.gradeLevel ?? '',
    taskDescription: data?.taskDescription ?? '',
    taskLaunch: data?.taskLaunch ?? '',
    anticipatedStrategies: Array.isArray(data?.anticipatedStrategies)
      ? data!.anticipatedStrategies
      : [],
    tentativeSequencing: data?.tentativeSequencing ?? '',
    tentativeSequencingDetails: data?.tentativeSequencingDetails ?? '',
    mathematicalConnections: data?.mathematicalConnections ?? '',
    mathematicalConnectionsDetails: data?.mathematicalConnectionsDetails ?? '',
  }
}

export default function LessonPlanModal({ data, onClose, onProceed }: LessonPlanModalProps) {
  const plan = normalizePlan(data)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Modal header ── */}
        <div className="flex items-start justify-between px-8 pt-6 pb-5 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 className="text-[22px] font-bold text-gray-900 leading-tight">
              Your Lesson Plan
            </h2>
            <p className="text-[13px] text-gray-400 mt-0.5">
              Thinking Through a Lesson Protocol (TTLP)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 px-8 py-6">

          {/* Document title + citation */}
          <h3 className="text-center font-bold text-[15px] text-gray-900 mb-2">
            Thinking Through a Lesson Protocol (TTLP) Planning Template
          </h3>
          <p className="text-center text-[11.5px] text-gray-500 mb-7 leading-relaxed max-w-2xl mx-auto">
            Adopted from Smith, Margaret, Victoria Bill, and Elizabeth Hughes. &ldquo;Thinking
            through a Lesson Protocol: A Key for Successfully Implementing High-Level
            Tasks.&rdquo; <em>Mathematics Teaching in the Middle School</em> 14 no. 3 (2008):
            132&ndash;38
          </p>

          {/* ── Section 1: Learning Goals / Grade Level / Task Description / Task Launch ── */}
          <table className="w-full border-collapse text-[13.5px] mb-8">
            <tbody>
              <tr>
                <td className={`${TD} w-1/2`} style={{ minHeight: '180px' }}>
                  <p className="font-bold mb-3">Learning Goals</p>
                  <p className="whitespace-pre-line">{plan.learningGoals}</p>
                </td>
                <td className={`${TD} w-1/2`}>
                  <p className="font-bold mb-3">Grade Level</p>
                  <p>{plan.gradeLevel}</p>
                </td>
              </tr>
              <tr>
                <td className={`${TD} w-1/2 h-40`}>
                  <p className="font-bold mb-3">Task Description</p>
                  <p>{plan.taskDescription}</p>
                </td>
                <td className={`${TD} w-1/2 h-40`}>
                  <p className="font-bold mb-3">Task Launch</p>
                  <p>{plan.taskLaunch}</p>
                </td>
              </tr>
            </tbody>
          </table>

          {/* ── Section 2: Anticipated Strategies / Assessing Questions / Who / Order ── */}
          <table className="w-full border-collapse text-[13.5px] mb-8">
            <thead>
              <tr>
                <th className={`${TH} w-[32%]`}>
                  Anticipated Strategies and
                  <br />
                  Misconceptions
                </th>
                <th className={`${TH} w-[42%]`}>Assessing and Advancing Questions</th>
                <th className={`${TH} w-[13%]`}>Who</th>
                <th className={`${TH} w-[13%]`}>Order</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: STRATEGY_ROWS }).map((_, i) => {
                const row = plan.anticipatedStrategies[i]
                return (
                  <tr key={i}>
                    <td className={`${TD} h-24`}>{row?.strategy ?? ''}</td>
                    <td className={`${TD} h-24`}>{row?.questions ?? ''}</td>
                    <td className={`${TD} h-24 text-center`}>{row?.who ?? ''}</td>
                    <td className={`${TD} h-24 text-center`}>{row?.order ?? ''}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* ── Section 3: Tentative Sequencing / Mathematical Connections ── */}
          <table className="w-full border-collapse text-[13.5px] mb-6">
            <tbody>
              <tr>
                <td className={`${TD} w-1/2 h-44`}>
                  <p className="font-bold mb-3">Tentative Sequencing Pathways</p>
                  {plan.tentativeSequencing && <p>{plan.tentativeSequencing}</p>}
                  {plan.tentativeSequencingDetails && (
                    <p className="mt-2 text-gray-600">{plan.tentativeSequencingDetails}</p>
                  )}
                </td>
                <td className={`${TD} w-1/2 h-44`}></td>
              </tr>
              <tr>
                <td className={`${TD} w-1/2 h-44`}>
                  <p className="font-bold mb-3">Important Mathematical Connections</p>
                  {plan.mathematicalConnections && <p>{plan.mathematicalConnections}</p>}
                  {plan.mathematicalConnectionsDetails && (
                    <p className="mt-2 text-gray-600">{plan.mathematicalConnectionsDetails}</p>
                  )}
                </td>
                <td className={`${TD} w-1/2 h-44`}></td>
              </tr>
            </tbody>
          </table>

          {/* Bottom citation */}
          <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
            Adopted from Smith, Margaret, Victoria Bill, and Elizabeth Hughes. &ldquo;Thinking
            through a Lesson Protocol: A Key for Successfully Implementing High-Level
            Tasks.&rdquo; <em>Mathematics Teaching in the Middle School</em> 14 no. 3 (2008):
            132&ndash;38
          </p>
        </div>

        {/* ── Footer action bar ── */}
        <div className="flex items-center justify-center gap-4 px-8 py-5 border-t border-gray-200 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-7 py-3 rounded-full border border-gray-300 text-[14px] font-semibold bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 bg-clip-text text-transparent hover:border-gray-400 transition-colors"
          >
            Modify this Section
          </button>
          <button
            type="button"
            onClick={onProceed}
            className="px-8 py-3 rounded-full bg-indigo-600 text-white text-[14px] font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Proceed to Next Step
          </button>
        </div>
      </div>
    </div>
  )
}
