import { ProgressBar, Title } from '@/components'
import { TopicsList } from './topics-list'

export function PlanInfo() {
  return (
    <div className="lg:col-span-2 space-y-6">
      <Title
        title="Plan Activo: Introducción a la Inteligencia Artificial"
        subtitle="Creado el 25 de Junio, 2026"
        additionalInfo={
          <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
            45% Completado
          </span>
        }
      />
      <ProgressBar value={45} />
      <TopicsList />
    </div>
  )
}
