import type { AssessmentDTO } from '@/features/assessment'
import type { SubTopicDTO } from './sub-topic.dto'

export type TopicDTO = {
  id: string
  title: string
  sub_topics: SubTopicDTO[]
  assessment?: AssessmentDTO
  study_plan_id: string
  created_on: string
}
