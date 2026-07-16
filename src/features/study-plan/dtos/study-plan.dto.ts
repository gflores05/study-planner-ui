import type { TopicDTO } from '@/features/topic'

export type GenerateStudyPlanRequest = {
  subject: string
  level: string
  grade: number
}

export type GenerateStudyPlanResponse = {
  study_plan_id: string
}

export const StudyPlanDTOStatus = {
  PENDING: 'PENDING',
  GENERATING: 'GENERATING',
  COMPLETED: 'COMPLETED',
  UNKNOWN: 'UNKNOWN',
  FAILED: 'FAILED'
}

export type StudyPlanDTOStatus =
  (typeof StudyPlanDTOStatus)[keyof typeof StudyPlanDTOStatus]

export type StudyPlanDTO = {
  id: string
  subject: string
  level: string
  grade: number
  topics: TopicDTO[]
  status: StudyPlanDTOStatus
  created_on: string
}
