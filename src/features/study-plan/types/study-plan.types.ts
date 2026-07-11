import type { Topic } from './topic.types'

export type StudyPlan = {
  id: string
  subject: string
  level: string
  grade: string
  topics: Topic[]
}
