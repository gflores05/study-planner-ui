import { apiClient } from '@/services'
import type { TopicDTO } from '../dtos'

export const TopicService = {
  get: async (id: string, includeChildren: boolean) => {
    const { data } = await apiClient.get<TopicDTO>(
      `/v1/topic/${id}?include_children=${includeChildren}`
    )

    return data
  }
}
