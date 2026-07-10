import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { Button, Navbar } from '@/components'

export function AssessmentExam() {
  return (
    <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
      Examen · Tema 2
    </span>
  )
}

export function AssessmentTopic() {
  return (
    <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
      Redes Neuronales Artificiales
    </h1>
  )
}

export function AssessmentTitle() {
  return (
    <div>
      <AssessmentExam />
      <AssessmentTopic />
    </div>
  )
}

export function AssessmentTime() {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 font-mono font-bold text-amber-700 ring-1 ring-inset ring-amber-600/10">
      <FontAwesomeIcon
        icon={faClock}
        className="text-amber-600 animate-pulse"
      />
      <span>14:25</span>
    </div>
  )
}

export function AssessmentCloseButton() {
  return (
    <Button title="Salir del examen" size="icon">
      <FontAwesomeIcon className="text-lg px-1" icon={faXmark} />
    </Button>
  )
}

export function AssessmentNavbar() {
  return (
    <Navbar>
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <AssessmentTitle />
        <div className="flex items-center gap-4">
          <AssessmentTime />
          <AssessmentCloseButton />
        </div>
      </div>
    </Navbar>
  )
}
