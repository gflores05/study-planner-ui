import { ProgressBar, Title } from '@/components'
import { TopicsList } from './topics-list'
import { useMemo } from 'react'
import { AssessmentStatus } from '@/features/assessment'
import { useStudyPlan } from '@/features/study-plan/hooks/study-plan.hooks'

export function PlanInfo() {
  const { studyPlan } = useStudyPlan()

  const createdOn = useMemo(() => {
    if (!studyPlan) {
      return
    }

    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full'
    }).format(new Date(studyPlan.createdOn))
  }, [studyPlan])

  const progress = useMemo(() => {
    if (!studyPlan) {
      return 0
    }

    const all = studyPlan.topics.length
    const completed = studyPlan.topics.filter(
      t => t.assessment?.status === AssessmentStatus.COMPLETED
    ).length

    return Math.round((completed / all) * 100)
  }, [studyPlan])

  if (!studyPlan) {
    return null
  }

  return (
    <div className="lg:col-span-2 space-y-6">
      <Title
        title={`Active Plan: ${studyPlan.subject}`}
        subtitle={`Created on ${createdOn}`}
        additionalInfo={
          <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
            {progress}% Completado
          </span>
        }
      />
      <ProgressBar value={progress} />
      <TopicsList />
    </div>
  )
}
