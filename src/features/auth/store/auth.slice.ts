import { createSlice } from '@reduxjs/toolkit'
import { getAccessToken } from '@/services'
import { getUser, login, register } from './auth.thunks'
import type { User } from '../types'

export interface AuthState {
  current: User | null
  isAuthenticated: boolean
  /** Loading the current user. */
  loading: boolean
  error: string | null
  /** A login/register request is in flight. */
  submitting: boolean
  authError: string | null
}

// Lazy so the session is restored from storage when the store is created
// (and again when it is reset on logout).
const initialState = (): AuthState => ({
  current: null,
  isAuthenticated: getAccessToken() !== null,
  loading: false,
  error: null,
  submitting: false,
  authError: null
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => ({ ...initialState(), isAuthenticated: false }),
    resetAuthError: state => {
      state.authError = null
    }
  },
  extraReducers: builder => {
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
        state.error = action.payload ?? 'Failed to load the user'
      })

    for (const thunk of [login, register]) {
      builder
        .addCase(thunk.pending, state => {
          state.submitting = true
          state.authError = null
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.submitting = false
          state.isAuthenticated = true
          state.current = action.payload
        })
        .addCase(thunk.rejected, (state, action) => {
          state.submitting = false
          state.authError = action.payload ?? 'Something went wrong'
        })
    }
  }
})

export const { logout, resetAuthError } = authSlice.actions
export default authSlice.reducer
