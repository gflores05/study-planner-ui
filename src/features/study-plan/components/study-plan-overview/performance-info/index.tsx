import type { StudyPlan } from '@/features/study-plan/types'
import { IASuggestion } from './ia-suggestion'
import { PerformanceCard } from './performance-card'

interface PerformanceInfoProps {
  studyPlan: StudyPlan
}

export function PerformanceInfo({ studyPlan }: PerformanceInfoProps) {
  return (
    <div className="space-y-6">
      <PerformanceCard studyPlan={studyPlan} />
      <IASuggestion />
    </div>
  )
}
