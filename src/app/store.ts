import { configureStore } from '@reduxjs/toolkit'
import studyPlanReducer from '@/features/study-plan/store/study-plan.slice'

export const store = configureStore({
  reducer: {
    studyPlan: studyPlanReducer
    // assessment:   assessmentReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
