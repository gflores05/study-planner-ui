import { type StudyPlanDTO, StudyPlanDTOStatus } from '../dtos'
import { type StudyPlan, StudyPlanStatus } from '../types'
import { TopicMapper } from './topic.mapper'

export const StudyPlanMapper = {
  fromDTO: (dto: StudyPlanDTO): StudyPlan => ({
    id: dto.id,
    subject: dto.subject,
    level: dto.level,
    grade: dto.grade,
    topics: dto.topics.map(TopicMapper.fromDTO),
    status: mapStudyPlanDTOStatus(dto.status),
    createdOn: new Date(dto.created_on).toISOString()
  })
}

function mapStudyPlanDTOStatus(status: StudyPlanDTOStatus): StudyPlanStatus {
  switch (status) {
    case StudyPlanDTOStatus.PENDING:
      return StudyPlanStatus.PENDING
    case StudyPlanDTOStatus.GENERATING:
      return StudyPlanStatus.GENERATING
    case StudyPlanDTOStatus.COMPLETED:
      return StudyPlanStatus.COMPLETED
    case StudyPlanDTOStatus.FAILED:
      return StudyPlanStatus.FAILED
    default:
      return StudyPlanStatus.UNKNOWN
  }
}
