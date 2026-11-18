import type { LoginRequestDTO, RegisterRequestDTO } from '../dtos'
import type { LoginFormValues, RegisterFormValues } from '../schemas'

export const AuthMapper = {
  toLoginRequestDTO: (values: LoginFormValues): LoginRequestDTO => ({
    email: values.email.trim(),
    password: values.password
  }),
  toRegisterRequestDTO: (values: RegisterFormValues): RegisterRequestDTO => ({
    email: values.email.trim(),
    name: values.name.trim(),
    password: values.password
  })
}
