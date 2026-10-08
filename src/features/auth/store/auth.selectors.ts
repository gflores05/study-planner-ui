import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

export const selectAuthState = (state: RootState) => state.auth

export const selectCurrentUser = createSelector(
  selectAuthState,
  authState => authState.current
)

export const selectUserLoading = createSelector(
  selectAuthState,
  authState => authState.loading
)

export const selectUserError = createSelector(
  selectAuthState,
  authState => authState.error
)

export const selectToken = createSelector(
  selectAuthState,
  authState => authState.token
)
