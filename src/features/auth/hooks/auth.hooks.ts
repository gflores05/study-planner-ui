import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { clearTokens } from '@/services'
import {
  getUser,
  login as loginThunk,
  logout as logoutAction,
  register as registerThunk,
  resetAuthError as resetAuthErrorAction,
  selectAuthError,
  selectAuthSubmitting,
  selectCurrentUser,
  selectIsAuthenticated,
  selectUserError,
  selectUserLoading
} from '../store'
import { useCallback } from 'react'
import type { LoginFormValues, RegisterFormValues } from '../schemas'

export function useAuth() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isUserLoading = useAppSelector(selectUserLoading)
  const error = useAppSelector(selectUserError)
  const submitting = useAppSelector(selectAuthSubmitting)
  const authError = useAppSelector(selectAuthError)

  const fetchUser = useCallback(() => {
    dispatch(getUser())
  }, [dispatch])

  /** Resolves with the user, rejects with the error message. */
  const login = useCallback(
    (values: LoginFormValues) => dispatch(loginThunk(values)).unwrap(),
    [dispatch]
  )

  /** Registers and logs in. Resolves with the user, rejects with the message. */
  const register = useCallback(
    (values: RegisterFormValues) => dispatch(registerThunk(values)).unwrap(),
    [dispatch]
  )

  const logout = useCallback(() => {
    clearTokens()
    dispatch(logoutAction())
  }, [dispatch])

  const resetAuthError = useCallback(() => {
    dispatch(resetAuthErrorAction())
  }, [dispatch])

  return {
    user,
    isAuthenticated,
    isUserLoading,
    error,
    submitting,
    authError,
    fetchUser,
    login,
    register,
    logout,
    resetAuthError
  }
}
