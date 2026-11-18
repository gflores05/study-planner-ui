import { Route, Routes } from 'react-router'
import { StudyPlanGenerator, StudyPlanOverview } from '../features/study-plan'
import { AssessmentLayout, AssessmentResolution } from '../features/assessment'
import { PlanInfo } from '@/features/study-plan/components/study-plan-overview/plan-info'
import { TopicInfo } from '@/features/topic/components/topic-info'
import { LoginPage, RegisterPage, RequireAuth } from '@/features/auth'
import { NotFound } from '@/app/components/not-found'
import { Home } from './components/home'
import { AppLayout } from './components/layout'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<RequireAuth />}>
          <Route path="start" element={<StudyPlanGenerator />} />
          <Route path="study-plan/:studyPlanId" element={<StudyPlanOverview />}>
            <Route index element={<PlanInfo />} />
            <Route path="topic/:topicId" element={<TopicInfo />} />
          </Route>
        </Route>
      </Route>
      <Route element={<RequireAuth />}>
        <Route
          path="study-plan/:studyPlanId/assessment/:assessmentId"
          element={<AssessmentLayout />}>
          <Route index element={<AssessmentResolution />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
