import { configureStore } from '@reduxjs/toolkit'
import studyPlanReducer from '@/features/study-plan/store/study-plan.slice'
import topicReducer from '@/features/topic/store/topic.slice'
import assessmentReducer from '@/features/assessment/store/assessment.slice'

export const store = configureStore({
  reducer: {
    studyPlan: studyPlanReducer,
    topic: topicReducer,
    assessment: assessmentReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
