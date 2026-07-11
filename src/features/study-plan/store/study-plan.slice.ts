import { createSlice } from '@reduxjs/toolkit'
import type { StudyPlan } from '../types'
import { getStudyPlan, requestStudyPlan } from './study-plan.thunks'

interface StudyPlanState {
  current: StudyPlan | null
  loading: boolean
  error: string | null
}

const initialState: StudyPlanState = {
  current: null,
  loading: false,
  error: null
}

const studyPlanSlice = createSlice({
  name: 'studyPlan',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Handle the requestStudyPlan thunk actions
    builder
      .addCase(requestStudyPlan.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(requestStudyPlan.fulfilled, state => {
        state.loading = false
      })
      .addCase(requestStudyPlan.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string | null
      })

    // Handle the getStudyPlan thunk actions
    builder
      .addCase(getStudyPlan.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getStudyPlan.fulfilled, (state, action) => {
        state.loading = false
        state.current = action.payload
      })
      .addCase(getStudyPlan.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string | null
      })
  }
})

export const {} = studyPlanSlice.actions
export default studyPlanSlice.reducer
