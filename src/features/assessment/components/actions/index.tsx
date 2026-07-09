import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function AssessmentActions() {
  return (
    <div className="mt-6 flex items-center justify-between">
      <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
        <FontAwesomeIcon icon={faArrowLeft} /> Anterior
      </button>

      <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-colors">
        Siguiente Pregunta <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  )
}
