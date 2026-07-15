import { Route, Routes } from 'react-router'
import { StudyPlanGenerator, StudyPlanOverview } from '../features/study-plan'
import { AssessmentResolution } from '../features/assessment'

export function AppRouter() {
  return (
    <Routes>
      <Route index element={<StudyPlanGenerator />} />
      <Route path="study-plan/:studyPlanId" element={<StudyPlanOverview />} />
      <Route
        path="study-plan/:studyPlanId/assessment/:assessmentId"
        element={<AssessmentResolution />}
      />
    </Routes>
  )
}
