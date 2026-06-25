import { type ReactNode } from 'react'
import type { LessonPlanData } from '../types/lessonPlan'

interface FinalPlanViewProps {
  data: LessonPlanData
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-indigo-500 uppercase tracking-widest mb-1.5">
        {title}
      </p>
      <div className="text-[13px] text-gray-700 leading-relaxed">{children}</div>
    </div>
  )
}

function empty(value: string | undefined): boolean {
  return !value?.trim()
}

export default function FinalPlanView({ data }: FinalPlanViewProps) {
  const strategies = (data.anticipatedStrategies ?? []).filter((s) => s.strategy?.trim())

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
      {/* Completion message bubble */}
      <div className="flex justify-start">
        <div className="max-w-[72%] rounded-2xl rounded-bl-sm px-5 py-3.5 text-[14px] leading-relaxed bg-white text-gray-700 border border-gray-100 shadow-sm">
          Your lesson plan is complete. Review the summary below and download your plan when ready.
        </div>
      </div>

      {/* Lesson Plan Preview Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-bold text-gray-900">Lesson Plan Preview</h3>
          <span className="text-[11px] bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full">
            Ready
          </span>
        </div>

        <div className="flex flex-col gap-5 divide-y divide-gray-100">
          <Section title="Learning Goals">
            {empty(data.learningGoals) ? (
              <span className="text-gray-400 italic">Not added yet.</span>
            ) : (
              <span className="whitespace-pre-line">{data.learningGoals}</span>
            )}
          </Section>

          <div className="pt-4">
            <Section title="Task">
              {empty(data.taskDescription) ? (
                <span className="text-gray-400 italic">Not added yet.</span>
              ) : (
                data.taskDescription
              )}
            </Section>
          </div>

          <div className="pt-4">
            <Section title="Task Launch">
              {empty(data.taskLaunch) ? (
                <span className="text-gray-400 italic">Not added yet.</span>
              ) : (
                data.taskLaunch
              )}
            </Section>
          </div>

          {strategies.length > 0 && (
            <div className="pt-4">
              <Section title="Anticipated Student Strategies">
                <ul className="list-disc list-inside space-y-1">
                  {strategies.map((s, i) => (
                    <li key={i}>{s.strategy}</li>
                  ))}
                </ul>
              </Section>
            </div>
          )}

          <div className="pt-4">
            <Section title="Sharing Sequence">
              {empty(data.tentativeSequencing) ? (
                <span className="text-gray-400 italic">Not added yet.</span>
              ) : (
                <>
                  <p>{data.tentativeSequencing}</p>
                  {data.tentativeSequencingDetails && (
                    <p className="mt-1 text-gray-500">{data.tentativeSequencingDetails}</p>
                  )}
                </>
              )}
            </Section>
          </div>

          <div className="pt-4">
            <Section title="Mathematical Connections">
              {empty(data.mathematicalConnections) ? (
                <span className="text-gray-400 italic">Not added yet.</span>
              ) : (
                <>
                  <p>{data.mathematicalConnections}</p>
                  {data.mathematicalConnectionsDetails && (
                    <p className="mt-1 text-gray-500 italic">{data.mathematicalConnectionsDetails}</p>
                  )}
                </>
              )}
            </Section>
          </div>
        </div>
      </div>
    </div>
  )
}
