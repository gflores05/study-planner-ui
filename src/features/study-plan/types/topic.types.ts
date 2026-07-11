import type { Assessment } from '@/features/assessment'
import type { SubTopic } from './sub-topic.types'

export type Topic = {
  title: string
  subTopics: SubTopic[]
  assessment?: Assessment
  studyPlanId: string
}
