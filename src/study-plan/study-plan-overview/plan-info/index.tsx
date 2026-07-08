import { PlanProgress } from './plan-progress'
import { PlanTitle } from './plan-title'
import { TopicsList } from './topics-list'

export function PlanInfo() {
  return (
    <div className="lg:col-span-2 space-y-6">
      <PlanTitle />
      <PlanProgress />
      <TopicsList />
    </div>
  )
}
