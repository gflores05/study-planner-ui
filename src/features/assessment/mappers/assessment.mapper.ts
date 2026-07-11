import type { AssessmentDTO } from '../dtos'
import type { Assessment } from '../types'
import { QuestionMapper } from './question.mapper'

export const AssessmentMapper = {
  fromDTO: (dto: AssessmentDTO): Assessment => ({
    id: dto.id,
    score: dto.score,
    status: dto.status,
    startedOn: dto.started_on ? new Date(dto.started_on) : undefined,
    completedOn: dto.completed_on ? new Date(dto.completed_on) : undefined,
    topicId: dto.topic_id,
    questions: dto.questions.map(QuestionMapper.fromDTO)
  })
}
