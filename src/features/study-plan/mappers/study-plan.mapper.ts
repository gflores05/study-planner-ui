import type { StudyPlanDTO } from '../dtos'
import type { StudyPlan } from '../types'
import { TopicMapper } from './topic.mapper'

export const StudyPlanMapper = {
  fromDTO: (dto: StudyPlanDTO): StudyPlan => ({
    id: dto.id,
    subject: dto.subject,
    level: dto.level,
    grade: dto.grade,
    topics: dto.topics.map(TopicMapper.fromDTO)
  })
}
