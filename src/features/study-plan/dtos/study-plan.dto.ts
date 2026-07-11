import type { TopicDTO } from './topic.dto'

export type GenerateStudyPlanRequest = {
  subject: string
  level: string
  grade: string
}

export type GenerateStudyPlanResponse = {
  id: string
}

export type StudyPlanDTO = {
  id: string
  subject: string
  level: string
  grade: string
  topics: TopicDTO[]
}
