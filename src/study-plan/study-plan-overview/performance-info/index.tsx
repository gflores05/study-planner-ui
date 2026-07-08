import { IASuggestion } from './ia-suggestion'
import { PerformanceCard } from './performance-card'

export function PerformanceInfo() {
  return (
    <div className="space-y-6">
      <PerformanceCard />
      <IASuggestion />
    </div>
  )
}
