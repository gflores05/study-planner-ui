interface QuestionCompletedButtonProps {
  children: string
}

export function QuestionCompletedButton({
  children
}: QuestionCompletedButtonProps) {
  return (
    <button className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold ring-1 ring-emerald-600/10">
      {children}
    </button>
  )
}

interface CurrentQuestionButtonProps {
  children: string
}

export function CurrentQuestionButton({
  children
}: CurrentQuestionButtonProps) {
  return (
    <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-xs font-bold">
      {children}
    </button>
  )
}

interface QuestionNavigationButtonProps {
  children: string
}

export function QuestionNavigationButton({
  children
}: QuestionNavigationButtonProps) {
  return (
    <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 text-xs font-medium hover:bg-slate-50">
      {children}
    </button>
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
