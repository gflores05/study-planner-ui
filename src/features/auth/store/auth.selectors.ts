import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from '@/app/store'

export const selectUserState = (state: RootState) => state.auth

export const selectCurrentUser = createSelector(
  selectUserState,
  userState => userState.current
)

export const selectUserLoading = createSelector(
  selectUserState,
  userState => userState.loading
)

export const selectUserError = createSelector(
  selectUserState,
  userState => userState.error
)
