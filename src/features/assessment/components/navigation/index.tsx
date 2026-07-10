import { Button } from '@/components'

interface QuestionCompletedButtonProps {
  children: string
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
  children: string
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
  children: string
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
  return (
    <footer className="bg-white border-t border-slate-200 py-4 mt-auto">
      <div className="mx-auto max-w-4xl px-4 flex flex-wrap justify-center gap-2">
        <QuestionCompletedButton>1</QuestionCompletedButton>
        <QuestionCompletedButton>2</QuestionCompletedButton>
        <CurrentQuestionButton>3</CurrentQuestionButton>
        <QuestionNavigationButton>4</QuestionNavigationButton>
        <QuestionNavigationButton>5</QuestionNavigationButton>
        <QuestionNavigationButton>6</QuestionNavigationButton>
        <QuestionNavigationButton>7</QuestionNavigationButton>
        <QuestionNavigationButton>8</QuestionNavigationButton>
        <QuestionNavigationButton>9</QuestionNavigationButton>
        <QuestionNavigationButton>10</QuestionNavigationButton>
      </div>
    </footer>
  )
}
