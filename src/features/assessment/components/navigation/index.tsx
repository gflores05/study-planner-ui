import { Button } from '@/components'
import { useAssessment } from '../../hooks/assessment.hooks'

interface QuestionCompletedButtonProps {
  children: React.ReactNode
}

export function QuestionCompletedButton({
  children
}: QuestionCompletedButtonProps) {
  return (
    <Button variant="success" size="small">
      {children}
    </Button>
  )
}

interface CurrentQuestionButtonProps {
  children: React.ReactNode
}

export function CurrentQuestionButton({
  children
}: CurrentQuestionButtonProps) {
  return (
    <Button variant="primary" size="small">
      {children}
    </Button>
  )
}

interface QuestionNavigationButtonProps {
  children: React.ReactNode
}

export function QuestionNavigationButton({
  children
}: QuestionNavigationButtonProps) {
  return (
    <Button disabled size="small">
      {children}
    </Button>
  )
}

export function AssessmentNavigation() {
  const { questionIndex, questions } = useAssessment()
  return (
    <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
      <div className="mx-auto max-w-4xl px-4 flex flex-wrap justify-center gap-2">
        {questions.map((question, qi) => {
          const qnumber = qi + 1
          if (qi === questionIndex) {
            return <CurrentQuestionButton>{qnumber}</CurrentQuestionButton>
          }
          if (question.selectedAnswer) {
            return <QuestionCompletedButton>{qnumber}</QuestionCompletedButton>
          }
          return <QuestionNavigationButton>{qnumber}</QuestionNavigationButton>
        })}
      </div>
    </footer>
  )
}
