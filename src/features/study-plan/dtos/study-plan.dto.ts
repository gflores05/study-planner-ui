import type { TopicDTO } from './topic.dto'

export type GenerateStudyPlanRequest = {
  subject: string
  level: string
  grade: number
}

export type GenerateStudyPlanResponse = {
  study_plan_id: string
}

export type StudyPlanDTO = {
  id: string
  subject: string
  level: string
  grade: number
  topics: TopicDTO[]
}
