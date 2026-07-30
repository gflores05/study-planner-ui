import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { getUser } from './auth.thunks'
import type { User } from '../types'

interface AuthState {
  current: User | null
  token: string | null
  error: string | null
  loading: boolean
}

const initialState: AuthState = {
  current: null,
  token: null,
  error: null,
  loading: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, payload: PayloadAction<string>) => {
      state.token = payload.payload
    }
  },
  extraReducers: builder => {
    // Handle the getUser thunk actions
    builder
      .addCase(getUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
        state.current = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string | null
      })
  }
})

export const { setToken } = authSlice.actions
export default authSlice.reducer
