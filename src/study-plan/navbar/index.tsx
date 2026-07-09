import { faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from '../../components/navbar'

function StudyPlanLevel() {
  return (
    <div className="flex items-center gap-4">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-555 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
        Nivel: Universitario
      </span>

      <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
        <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600 ring-2 ring-slate-100">
          U
        </div>
      </div>
    </div>
  )
}

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
        <FontAwesomeIcon className="text-xl" icon={faUserGraduate} />
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-900">
        Edu<span className="text-indigo-600">Plan</span>
      </span>
    </div>
  )
}

export function StudyPlanNavbar() {
  return (
    <Navbar compact>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Brand />
        <StudyPlanLevel />
      </div>
    </Navbar>
  )
}
