import { apiClient } from '@/services'
import type {
  AnswerQuestionResponseDTO,
  AssessmentDTO,
  AssessmentResponseDTO
} from '../dtos'

export const AssessmentService = {
  get: async (id: string) => {
    const { data } = await apiClient.get<AssessmentDTO>(`/v1/assessment/${id}`)

    return data
  },
  start: async (id: string) => {
    const { data } = await apiClient.post<AssessmentResponseDTO>(
      `/v1/assessment/${id}/start`
    )

    return data
  },
  answer: async (assessmentId: string, questionId: string, answer: string) => {
    const { data } = await apiClient.post<AnswerQuestionResponseDTO>(
      `/v1/assessment/${assessmentId}/answer`,
      { question_id: questionId, selected_answer: answer }
    )

    return data
  },
  complete: async (id: string) => {
    const { data } = await apiClient.post<AssessmentResponseDTO>(
      `/v1/assessment/${id}/complete`
    )

    return data
  }
}
