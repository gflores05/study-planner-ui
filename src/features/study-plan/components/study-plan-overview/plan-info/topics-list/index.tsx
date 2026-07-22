import { useStudyPlan } from '@/features/study-plan/hooks/study-plan.hooks'
import {
  CompletedTopicCard,
  InProgressTopicCard,
  PendingTopicCard
} from './topic-card'
import { AssessmentStatus } from '@/features/assessment'

export function TopicsList() {
  const { studyPlan } = useStudyPlan()

  const current = studyPlan?.topics.find(
    t => t.assessment?.status === AssessmentStatus.PENDING
  )
  return (
    <div className="space-y-4">
      {studyPlan?.topics.map((topic, index) => {
        const order = index + 1
        if (!topic.assessment) {
          return null
        }

        if (topic.id === current?.id) {
          return (
            <InProgressTopicCard
              key={topic.id}
              topic={topic}
              order={order}
              studyPlanId={studyPlan.id}
            />
          )
        }

        switch (topic.assessment.status) {
          case AssessmentStatus.PENDING:
            return (
              <PendingTopicCard key={topic.id} topic={topic} order={order} />
            )
          case AssessmentStatus.IN_PROGRESS:
            return (
              <InProgressTopicCard
                key={topic.id}
                topic={topic}
                order={order}
                studyPlanId={studyPlan.id}
              />
            )
          case AssessmentStatus.COMPLETED:
            return (
              <CompletedTopicCard key={topic.id} topic={topic} order={order} />
            )
        }

        return null
      })}
    </div>
  )
}
