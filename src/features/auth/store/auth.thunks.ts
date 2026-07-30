import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserService } from '../services/user.service'
import type { User } from '../types'
import { UserMapper } from '../mappers'

export const getUser = createAsyncThunk<User, {}, { rejectValue: string }>(
  'user/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.get()

      return UserMapper.fromDTO(response)
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)
