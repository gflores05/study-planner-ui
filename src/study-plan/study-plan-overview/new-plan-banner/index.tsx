export function NewPlanBanner() {
  return (
    <div className="mb-8 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold sm:text-3xl">
          ¡Hola de nuevo! Listo para estudiar?
        </h1>
        <p className="mt-2 text-indigo-100">
          Aquí tienes el progreso de tu plan de estudios actual. Completa las
          lecturas y pon a prueba tus conocimientos con los exámenes generados.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 transition-colors">
            <i className="fa-solid fa-plus"></i> Nuevo Plan de Estudios
          </button>
        </div>
      </div>
    </div>
  )
}
