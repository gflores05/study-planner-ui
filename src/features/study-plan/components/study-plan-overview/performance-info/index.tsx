import type { StudyPlan } from '@/features/study-plan/types'
import { AISuggestion } from './ai-suggestion'
import { PerformanceCard } from './performance-card'

interface PerformanceInfoProps {
  studyPlan: StudyPlan
}

export function PerformanceInfo({ studyPlan }: PerformanceInfoProps) {
  return (
    <div className="space-y-6">
      <PerformanceCard studyPlan={studyPlan} />
      <AISuggestion studyPlan={studyPlan} />
    </div>
  )
}
