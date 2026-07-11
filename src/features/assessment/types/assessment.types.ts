import type { Question } from './question.types'

export const AssessmentStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  UNKNOWN: 'UNKNOWN'
}

export type AssessmentStatus =
  (typeof AssessmentStatus)[keyof typeof AssessmentStatus]

export type Assessment = {
  id: string
  status: AssessmentStatus
  score?: number
  questions: Question[]
  startedOn?: Date
  completedOn?: Date
  topicId: string
}
