export function IASuggestion() {
  return (
    <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-6 shadow-sm">
      <div className="flex items-center gap-2 text-amber-800 font-bold mb-2">
        <i className="fa-solid fa-lightbulb"></i>
        <h4>Sugerencia de la IA</h4>
      </div>
      <p className="text-sm text-amber-900/80 leading-relaxed">
        El "Tema 2" tiene conceptos complejos de matemáticas. Te recomendamos
        repasar los apuntes generados antes de iniciar el examen para mantener
        tu promedio alto.
      </p>
    </div>
  )
}
