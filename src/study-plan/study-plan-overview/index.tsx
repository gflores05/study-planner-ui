import { NewPlanBanner } from './new-plan-banner'
import { PerformanceInfo } from './performance-info'
import { PlanInfo } from './plan-info'

export function StudyPlanOverview() {
  return (
    <>
      <NewPlanBanner />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <PlanInfo />
        <PerformanceInfo />
      </div>
    </>
  )
}
