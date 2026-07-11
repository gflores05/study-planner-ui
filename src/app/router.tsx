import { Route, Routes } from 'react-router'
import { StudyPlanGenerator, StudyPlanOverview } from '../features/study-plan'
import { AssessmentResolution } from '../features/assessment'

export function AppRouter() {
  return (
    <Routes>
      <Route index element={<StudyPlanGenerator />} />
      <Route path="study-plan/:assessmentId" element={<StudyPlanOverview />} />
      <Route
        path="assessment/:assessmentId"
        element={<AssessmentResolution />}
      />
    </Routes>
  )
}
