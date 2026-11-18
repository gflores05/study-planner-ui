import { createAsyncThunk } from '@reduxjs/toolkit'
import { setTokens } from '@/services'
import { AuthService, UserService } from '../services'
import type { User } from '../types'
import { AuthMapper, UserMapper } from '../mappers'
import type { LoginFormValues, RegisterFormValues } from '../schemas'
import { authErrorMessage } from './auth.errors'

async function startSession(values: LoginFormValues): Promise<User> {
  const tokens = await AuthService.login(AuthMapper.toLoginRequestDTO(values))

  setTokens({ access: tokens.access_token, refresh: tokens.refresh_token })

  return UserMapper.fromDTO(await UserService.get())
}

export const getUser = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.get()

      return UserMapper.fromDTO(response)
    } catch (error) {
      return rejectWithValue(authErrorMessage(error))
    }
  }
)

export const login = createAsyncThunk<
  User,
  LoginFormValues,
  { rejectValue: string }
>('auth/login', async (values, { rejectWithValue }) => {
  try {
    return await startSession(values)
  } catch (error) {
    return rejectWithValue(authErrorMessage(error))
  }
})

/** Registers the user and logs them in right away. */
export const register = createAsyncThunk<
  User,
  RegisterFormValues,
  { rejectValue: string }
>('auth/register', async (values, { rejectWithValue }) => {
  try {
    await AuthService.register(AuthMapper.toRegisterRequestDTO(values))

    return await startSession({
      email: values.email,
      password: values.password
    })
  } catch (error) {
    return rejectWithValue(authErrorMessage(error))
  }
})
