import { ProgressBar, Title } from '@/components'
import { TopicsList } from './topics-list'
import type { StudyPlan } from '@/features/study-plan/types'
import { useMemo } from 'react'
import { AssessmentStatus } from '@/features/assessment'

interface PlanInfoProps {
  studyPlan: StudyPlan
}

export function PlanInfo({ studyPlan }: PlanInfoProps) {
  const createdOn = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full'
    }).format(new Date(studyPlan.createdOn))
  }, [studyPlan])

  const progress = useMemo(() => {
    const all = studyPlan.topics.length
    const completed = studyPlan.topics.filter(
      t => t.assessment?.status === AssessmentStatus.COMPLETED
    ).length

    return (completed / all) * 100
  }, [studyPlan])

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
      <TopicsList topics={studyPlan.topics} />
    </div>
  )
}
