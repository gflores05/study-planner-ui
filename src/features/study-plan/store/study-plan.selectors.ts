import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from '@/app/store'

export const selectStudyPlanState = (state: RootState) => state.studyPlan

export const selectCurrentStudyPlan = createSelector(
  selectStudyPlanState,
  studyPlanState => studyPlanState.current
)

export const selectStudyPlanLoading = createSelector(
  selectStudyPlanState,
  studyPlanState => studyPlanState.loading
)

export const selectStudyPlanError = createSelector(
  selectStudyPlanState,
  studyPlanState => studyPlanState.error
)
