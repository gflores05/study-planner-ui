import {
  AssessmentActions,
  AssessmentNavbar,
  AssessmentNavigation,
  AssessmentProgress,
  QuestionCard
} from '@/features/assessment'

interface AssessmentContainerProps {
  children: React.ReactNode
}
export function AssessmentContainer({ children }: AssessmentContainerProps) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
      {children}
    </main>
  )
}

export function AssessmentResolution() {
  return (
    <>
      <AssessmentNavbar />
      <AssessmentContainer>
        <AssessmentProgress />
        <QuestionCard />
        <AssessmentActions />
      </AssessmentContainer>
      <AssessmentNavigation />
    </>
  )
}
