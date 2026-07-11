import type { QuestionDTO } from './question.dto'

export const AssessmentStatusDTO = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  UNKNOWN: 'UNKNOWN'
}

export type AssessmentStatusDTO =
  (typeof AssessmentStatusDTO)[keyof typeof AssessmentStatusDTO]

export type AssessmentDTO = {
  id: string
  status: AssessmentStatusDTO
  score?: number
  questions: QuestionDTO[]
  started_on?: string
  completed_on?: string
  topic_id: string
}
