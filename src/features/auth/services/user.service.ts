import { apiClient } from '@/services'
import type { ChangePasswordRequestDTO, UserDTO } from '../dtos'

export const UserService = {
  get: async () => {
    const { data } = await apiClient.get<UserDTO>(`/v1/user/me`)

    return data
  },
  changePassword: async (payload: ChangePasswordRequestDTO) => {
    await apiClient.put('/v1/user/me/password', payload)
  }
}
