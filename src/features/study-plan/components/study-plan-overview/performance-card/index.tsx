import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from '@/components'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { useMemo } from 'react'
import { AssessmentStatus } from '@/features/assessment'
import { diffDays } from '@/lib/date-utils'
import { useStudyPlan } from '@/features/study-plan/hooks/study-plan.hooks'

export function PerformanceCard() {
  const { studyPlan } = useStudyPlan()

  const completedAssessments = useMemo(() => {
    return studyPlan
      ? studyPlan.topics
          .filter(t => t.assessment?.status === AssessmentStatus.COMPLETED)
          .map(t => t.assessment)
      : []
  }, [studyPlan])

  const average = useMemo(() => {
    if (!completedAssessments.length) {
      return 0
    }

    return (
      completedAssessments.reduce(
        (acc, assessment) => acc + (assessment?.score ?? 0),
        0
      ) / completedAssessments.length
    )
  }, [completedAssessments])

  const streak = useMemo(() => {
    if (!completedAssessments.length) {
      return 0
    }

    const last = completedAssessments.pop()
    const reverse = completedAssessments.reverse()

    return reverse.slice().reduce(
      (acc, assessment) => {
        if (!assessment || !acc.streak) {
          return acc
        }

        if (
          diffDays(
            new Date(assessment.completedOn!),
            new Date(acc.prev?.completedOn!)
          ) <= 1
        ) {
          return { days: acc.days + 1, streak: true, prev: assessment }
        }
        return { days: acc.days, streak: false, prev: assessment }
      },
      { days: 0, streak: true, prev: last }
    ).days
  }, [completedAssessments])
  return (
    <Card>
      <h3 className="font-bold text-slate-900 mb-4">Your Performance</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-sm text-slate-500">Exam Average</span>
          <span className="font-bold text-slate-900 text-lg">{average}%</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-sm text-slate-500">Completed Topics</span>
          <span className="font-bold text-slate-900">
            {completedAssessments.length} of {studyPlan?.topics.length}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Study Streak</span>
          <span className="font-bold text-amber-600 flex items-center gap-1">
            <FontAwesomeIcon icon={faFire} /> {streak} Days
          </span>
        </div>
      </div>
    </Card>
  )
}
