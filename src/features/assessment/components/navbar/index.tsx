import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { Button, Navbar } from '@/components'
import type { Topic } from '@/features/topic'
import { Spinner } from '@/components/ui/spinner'
import { NavLink } from 'react-router'

export function AssessmentExam() {
  return (
    <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
      Exam
    </span>
  )
}

interface AssessmentTopicProps {
  children: string
}
export function AssessmentTopic({ children }: AssessmentTopicProps) {
  return (
    <h1 className="text-lg font-bold text-slate-900 sm:text-xl">{children}</h1>
  )
}

interface AssessmentTitleProps {
  title: string
}

export function AssessmentTitle({ title }: AssessmentTitleProps) {
  return (
    <div>
      <AssessmentExam />
      <AssessmentTopic>{title}</AssessmentTopic>
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

interface AssessmentCloseButtonProps {
  studyPlanId: string
}
export function AssessmentCloseButton({
  studyPlanId
}: AssessmentCloseButtonProps) {
  return (
    <Button title="Salir del examen" size="icon">
      <NavLink to={`/study-plan/${studyPlanId}`}>
        <FontAwesomeIcon className="text-lg px-1" icon={faXmark} />
      </NavLink>
    </Button>
  )
}

interface AssessmentNavbarProps {
  topic: Topic | null
}

export function AssessmentNavbar({ topic }: AssessmentNavbarProps) {
  return (
    <Navbar>
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        {topic ? <AssessmentTitle title={topic?.title} /> : <Spinner />}

        <div className="flex items-center gap-4">
          <AssessmentTime />
          {topic && <AssessmentCloseButton studyPlanId={topic.studyPlanId} />}
        </div>
      </div>
    </Navbar>
  )
}
