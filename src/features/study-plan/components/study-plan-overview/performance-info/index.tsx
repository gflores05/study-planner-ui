import { PerformanceCard } from '../performance-card'
import { useStudyPlan } from '@/features/study-plan/hooks/study-plan.hooks'

export function PerformanceInfo() {
  const { studyPlan } = useStudyPlan()

  if (!studyPlan) {
    return null
  }

  return (
    <div className="space-y-6">
      <PerformanceCard />
    </div>
  )
}
