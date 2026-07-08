export function CompletedTopicCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <i className="fa-solid fa-circle-check text-lg"></i>
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
                <i className="fa-regular fa-clock"></i> 2 horas
              </span>
            </div>
          </div>
        </div>
        <button className="shrink-0 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
          <i className="fa-solid fa-award mr-1"></i> Examen: 90/100
        </button>
      </div>
    </div>
  )
}

export function InProgressTopicCard() {
  return (
    <div className="rounded-xl border-2 border-indigo-600 bg-white p-5 shadow-sm ring-1 ring-indigo-100">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 animate-pulse">
            <i className="fa-solid fa-book-open text-lg"></i>
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
                <i className="fa-regular fa-clock"></i> 4 horas
              </span>
            </div>
          </div>
        </div>
        <button className="shrink-0 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors">
          <i className="fa-solid fa-pen-to-square mr-1"></i> Tomar Examen
        </button>
      </div>
    </div>
  )
}

export function PendingTopicCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm opacity-70">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
            <i className="fa-solid fa-lock text-lg"></i>
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
                <i className="fa-regular fa-clock"></i> 3 horas
              </span>
            </div>
          </div>
        </div>
        <button
          disabled
          className="shrink-0 rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-400 cursor-not-allowed">
          Bloqueado
        </button>
      </div>
    </div>
  )
}
