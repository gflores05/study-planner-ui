import { ProgressBar } from '../../../../../components/progress-bar'
import { PlanTitle } from './plan-title'
import { TopicsList } from './topics-list'

export function PlanInfo() {
  return (
    <div className="lg:col-span-2 space-y-6">
      <PlanTitle />
      <ProgressBar value={45} />
      <TopicsList />
    </div>
  )
}
