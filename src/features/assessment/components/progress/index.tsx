import { ProgressBar } from '@/components'
import { useMemo } from 'react'

interface AssessmentQuestionNumberProps {
  current: number
  total: number
}

export function AssessmentQuestionNumber({
  current,
  total
}: AssessmentQuestionNumberProps) {
  return (
    <span className="font-medium text-slate-500">
      Question <span className="font-bold text-slate-900">{current}</span> of{' '}
      {total}
    </span>
  )
}

interface ProgressPercentageProps {
  current: number
  percentage: number
  total: number
}

export function ProgressPercentage({
  current,
  percentage,
  total
}: ProgressPercentageProps) {
  return (
    <div className="flex items-center justify-between text-sm mb-2">
      <AssessmentQuestionNumber current={current} total={total} />
      <span className="font-semibold text-indigo-600">
        {percentage}% Completed
      </span>
    </div>
  )
}

interface AssessmentProgressProps {
  current: number
  completed: number
  total: number
}

export function AssessmentProgress({
  completed,
  total,
  current
}: AssessmentProgressProps) {
  const percentage = useMemo(
    () => (completed / total) * 100,
    [total, completed]
  )

  return (
    <div className="mb-8">
      <ProgressPercentage
        current={current}
        total={total}
        percentage={percentage}
      />
      <ProgressBar value={percentage} />
    </div>
  )
}
