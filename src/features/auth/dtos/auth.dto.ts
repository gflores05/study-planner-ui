export type LoginRequestDTO = {
  email: string
  password: string
}

export type RegisterRequestDTO = {
  email: string
  name: string
  password: string
}

export type RegisterResponseDTO = {
  id: string
}

export type TokenResponseDTO = {
  access_token: string
  refresh_token: string
  token_type: 'bearer'
}

export type ChangePasswordRequestDTO = {
  current_password: string
  new_password: string
}

export type ApiErrorDTO = {
  error: string
  message: string
  data?: { field?: string } & Record<string, unknown>
}
