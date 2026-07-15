import type { Topic } from '@/features/study-plan/types'
import {
  CompletedTopicCard,
  InProgressTopicCard,
  PendingTopicCard
} from './topic-card'
import { AssessmentStatus } from '@/features/assessment'

interface TopicsListProps {
  studyPlanId: string
  topics: Topic[]
}

export function TopicsList({ topics, studyPlanId }: TopicsListProps) {
  const current = topics.find(
    t => t.assessment?.status === AssessmentStatus.PENDING
  )
  return (
    <div className="space-y-4">
      {topics.map((topic, index) => {
        const order = index + 1
        if (!topic.assessment) {
          return null
        }

        if (topic.id === current?.id) {
          return (
            <InProgressTopicCard
              topic={topic}
              order={order}
              studyPlanId={studyPlanId}
            />
          )
        }

        switch (topic.assessment.status) {
          case AssessmentStatus.PENDING:
            return <PendingTopicCard topic={topic} order={order} />
          case AssessmentStatus.IN_PROGRESS:
            return (
              <InProgressTopicCard
                topic={topic}
                order={order}
                studyPlanId={studyPlanId}
              />
            )
          case AssessmentStatus.COMPLETED:
            return <CompletedTopicCard topic={topic} order={order} />
        }

        return null
      })}
    </div>
  )
}
