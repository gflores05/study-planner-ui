import { apiClient } from '@/services'
import type { UserDTO } from '../dtos'

export const UserService = {
  get: async () => {
    const { data } = await apiClient.get<UserDTO>(`/v1/user/me`)

    return data
  }
}
