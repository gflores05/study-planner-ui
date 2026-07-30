import { Route, Routes } from 'react-router'
import { StudyPlanGenerator, StudyPlanOverview } from '../features/study-plan'
import { AssessmentResolution } from '../features/assessment'
import { PlanInfo } from '@/features/study-plan/components/study-plan-overview/plan-info'
import { TopicInfo } from '@/features/topic/components/topic-info'
import { AuthenticationGuard } from '@/features/auth/guards/authentication-guard'
import { NotFound } from '@/app/components/not-found'
import { Home } from './components/home'

export function AppRouter() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="callback" element={<Home />} />
      <Route
        path="start"
        element={<AuthenticationGuard component={StudyPlanGenerator} />}
      />
      <Route
        path="study-plan/:studyPlanId"
        element={<AuthenticationGuard component={StudyPlanOverview} />}>
        <Route index element={<PlanInfo />} />
        <Route path="topic/:topicId" element={<TopicInfo />} />
      </Route>
      <Route
        path="study-plan/:studyPlanId/assessment/:assessmentId"
        element={<AuthenticationGuard component={AssessmentResolution} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
