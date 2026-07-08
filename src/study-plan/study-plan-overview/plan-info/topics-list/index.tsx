import {
  CompletedTopicCard,
  InProgressTopicCard,
  PendingTopicCard
} from './topic-card'

export function TopicsList() {
  return (
    <div className="space-y-4">
      <CompletedTopicCard />
      <InProgressTopicCard />
      <PendingTopicCard />
    </div>
  )
}
