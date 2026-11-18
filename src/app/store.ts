import {
  combineReducers,
  configureStore,
  type UnknownAction
} from '@reduxjs/toolkit'
import authReducer, { logout } from '@/features/auth/store/auth.slice'
import studyPlanReducer from '@/features/study-plan/store/study-plan.slice'
import topicReducer from '@/features/topic/store/topic.slice'
import assessmentReducer from '@/features/assessment/store/assessment.slice'
import { setUnauthorizedHandler } from '@/services'

const rootReducer = combineReducers({
  auth: authReducer,
  studyPlan: studyPlanReducer,
  topic: topicReducer,
  assessment: assessmentReducer
})

type AppState = ReturnType<typeof rootReducer>

// Logging out drops every slice, so no data of the previous user survives.
function appReducer(
  state: Parameters<typeof rootReducer>[0],
  action: UnknownAction
) {
  return rootReducer(action.type === logout.type ? undefined : state, action)
}

export function makeStore(preloadedState?: Partial<AppState>) {
  return configureStore({ reducer: appReducer, preloadedState })
}

export const store = makeStore()

setUnauthorizedHandler(() => store.dispatch(logout()))

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
