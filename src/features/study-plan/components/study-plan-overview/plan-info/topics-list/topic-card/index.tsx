import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card } from '@/components'
import {
  faAward,
  faBookOpen,
  faCircleCheck,
  faClock,
  faLock,
  faPenToSquare
} from '@fortawesome/free-solid-svg-icons'

export function CompletedTopicCard() {
  return (
    <Card hover>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <FontAwesomeIcon icon={faCircleCheck} className="text-lg" />
          </div>
          <div>
            <h3 className="font-semibold line-through text-slate-400">
              Tema 1: Historia y Fundamentos
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Orígenes de la computación, el Test de Turing y los primeros
              sistemas expertos.
            </p>
            <div className="mt-3 flex gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                <FontAwesomeIcon icon={faClock} /> 2 horas
              </span>
            </div>
          </div>
        </div>
        <Button variant="success" size="small">
          <FontAwesomeIcon icon={faAward} className="mr-1" /> Examen: 90/100
        </Button>
      </div>
    </Card>
  )
}

export function InProgressTopicCard() {
  return (
    <Card selected>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 animate-pulse">
            <FontAwesomeIcon icon={faBookOpen} className="text-lg" />
          </div>
          <div>
            <span className="inline-block rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 mb-1">
              Estudiando ahora
            </span>
            <h3 className="font-semibold text-slate-900">
              Tema 2: Redes Neuronales Artificiales
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Perceptrón simple, funciones de activación y propagación hacia
              atrás (Backpropagation).
            </p>
            <div className="mt-3 flex gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                <FontAwesomeIcon icon={faClock} /> 4 horas
              </span>
            </div>
          </div>
        </div>
        <Button variant="primary" size="small">
          <FontAwesomeIcon icon={faPenToSquare} /> Tomar Examen
        </Button>
      </div>
    </Card>
  )
}

export function PendingTopicCard() {
  return (
    <Card disabled>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
            <FontAwesomeIcon icon={faLock} className="text-lg" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-700">
              Tema 3: Modelos de Lenguaje (LLMs)
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Arquitectura Transformer, Mecanismos de Atención y embeddings de
              texto.
            </p>
            <div className="mt-3 flex gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-400">
                <FontAwesomeIcon icon={faClock} /> 3 horas
              </span>
            </div>
          </div>
        </div>
        <Button disabled size="small">
          Bloqueado
        </Button>
      </div>
    </Card>
  )
}
