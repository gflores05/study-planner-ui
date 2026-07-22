import { Route, Routes } from 'react-router'
import { StudyPlanGenerator, StudyPlanOverview } from '../features/study-plan'
import { AssessmentResolution } from '../features/assessment'
import { PlanInfo } from '@/features/study-plan/components/study-plan-overview/plan-info'
import { TopicInfo } from '@/features/topic/components/topic-info'

export function AppRouter() {
  return (
    <Routes>
      <Route index element={<StudyPlanGenerator />} />
      <Route path="study-plan/:studyPlanId" element={<StudyPlanOverview />}>
        <Route index element={<PlanInfo />} />
        <Route path="topic/:topicId" element={<TopicInfo />} />
      </Route>
      <Route
        path="study-plan/:studyPlanId/assessment/:assessmentId"
        element={<AssessmentResolution />}
      />
    </Routes>
  )
}
