import { apiClient } from '@/services'
import type {
  GenerateStudyPlanRequest,
  GenerateStudyPlanResponse,
  StudyPlanDTO
} from '../dtos/study-plan.dto'

export const StudyPlanService = {
  request: async (request: GenerateStudyPlanRequest) => {
    const { data } = await apiClient.post<GenerateStudyPlanResponse>(
      '/v1/study-plan/request',
      request
    )

    return data
  },

  get: async (id: string) => {
    const { data } = await apiClient.get<StudyPlanDTO>(`/v1/study-plan/${id}`)

    return data
  }
}
