import { ProgressBar } from '../../components/progress-bar'

export function AssessmentQuestionNumber() {
  return (
    <span className="font-medium text-slate-500">
      Pregunta <span className="font-bold text-slate-900">3</span> de 10
    </span>
  )
}

export function ProgressPercentage() {
  return (
    <div className="flex items-center justify-between text-sm mb-2">
      <AssessmentQuestionNumber />
      <span className="font-semibold text-indigo-600">30% Completado</span>
    </div>
  )
}

export function AssessmentProgress() {
  return (
    <div className="mb-8">
      <ProgressPercentage />
      <ProgressBar value={30} />
    </div>
  )
}
