import { MainContainer } from '@/components'
import { StudyPlanNavbar } from '@/features/study-plan'
import { NewPlanBanner } from './new-plan-banner'
import { PerformanceInfo } from './performance-info'
import { PlanInfo } from './plan-info'
import { useStudyPlan } from '../../hooks/study-plan.hooks'
import { useParams } from 'react-router'
import { useEffect } from 'react'

interface ErrorMessageProps {
  children: React.ReactNode
}
export function ErrorMessage({ children }: ErrorMessageProps) {
  return <p className="text-red-600 text-sm font-medium mt-4">{children}</p>
}

export function StudyPlanOverview() {
  const { studyPlan, fetchStudyPlan, loading, error } = useStudyPlan()
  const { studyPlanId } = useParams()

  useEffect(() => {
    console.log('study plan id ', studyPlanId)
    if (studyPlanId && !studyPlan) {
      console.log('fetching study plan ', studyPlanId)
      fetchStudyPlan(studyPlanId)
    }
  }, [studyPlanId])

  return (
    <>
      <StudyPlanNavbar level={studyPlan?.level} loading={loading} />
      <MainContainer>
        <NewPlanBanner />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {studyPlan && <PlanInfo studyPlan={studyPlan} />}
          {studyPlan && <PerformanceInfo studyPlan={studyPlan} />}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
      </MainContainer>
    </>
  )
}
