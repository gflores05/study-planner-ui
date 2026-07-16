import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from '@/app/store'

export const selectTopicState = (state: RootState) => state.topic

export const selectCurrentTopic = createSelector(
  selectTopicState,
  topicState => topicState.current
)

export const selectTopicLoading = createSelector(
  selectTopicState,
  topicState => topicState.loading
)

export const selectTopicError = createSelector(
  selectTopicState,
  topicState => topicState.error
)
