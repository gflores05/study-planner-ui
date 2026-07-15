import { AssessmentMapper } from '@/features/assessment/mappers/assessment.mapper'
import type { TopicDTO } from '../dtos'
import type { Topic } from '../types'
import { SubTopicMapper } from './sub-topic.mapper'

export const TopicMapper = {
  fromDTO: (dto: TopicDTO): Topic => {
    return {
      id: dto.id,
      title: dto.title,
      subTopics: dto.sub_topics.map(SubTopicMapper.fromDTO),
      assessment: dto.assessment
        ? AssessmentMapper.fromDTO(dto.assessment)
        : undefined,
      studyPlanId: dto.study_plan_id
    }
  }
}
