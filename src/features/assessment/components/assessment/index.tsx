import {
  AssessmentActions,
  AssessmentNavbar,
  AssessmentNavigation,
  AssessmentProgress,
  Question
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

export function Assessment() {
  return (
    <>
      <AssessmentNavbar />
      <AssessmentContainer>
        <AssessmentProgress />
        <Question />
        <AssessmentActions />
      </AssessmentContainer>
      <AssessmentNavigation />
    </>
  )
}
