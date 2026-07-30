import { ErrorMessage } from '@/components'
import { NewPlanBanner } from './new-plan-banner'
import { PerformanceInfo } from './performance-info'
import { useStudyPlan } from '../../hooks/study-plan.hooks'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { AppLayout } from '@/app/components/layout'

export function StudyPlanOverview() {
  const { studyPlan, fetchStudyPlan, error } = useStudyPlan()
  const { studyPlanId } = useParams()

  useEffect(() => {
    if (studyPlanId && !studyPlan) {
      fetchStudyPlan(studyPlanId)
    }
  }, [studyPlanId])

  return (
    <AppLayout>
      <NewPlanBanner />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Outlet />
        {studyPlan && <PerformanceInfo />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </AppLayout>
  )
}
