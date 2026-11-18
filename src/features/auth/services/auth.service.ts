import { apiClient } from '@/services'
import type {
  LoginRequestDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
  TokenResponseDTO
} from '../dtos'

export const AuthService = {
  login: async (payload: LoginRequestDTO) => {
    const { data } = await apiClient.post<TokenResponseDTO>(
      '/v1/auth/login',
      payload
    )

    return data
  },
  register: async (payload: RegisterRequestDTO) => {
    const { data } = await apiClient.post<RegisterResponseDTO>(
      '/v1/auth/register',
      payload
    )

    return data
  }
}
