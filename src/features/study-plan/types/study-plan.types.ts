import type { Topic } from './topic.types'

export const StudyPlanStatus = {
  PENDING: 'PENDING',
  GENERATING: 'GENERATING',
  COMPLETED: 'COMPLETED',
  UNKNOWN: 'UNKNOWN',
  FAILED: 'FAILED'
}

export type StudyPlanStatus =
  (typeof StudyPlanStatus)[keyof typeof StudyPlanStatus]

export type StudyPlan = {
  id: string
  subject: string
  level: string
  grade: number
  topics: Topic[]
  status: StudyPlanStatus
  createdOn: string
}
