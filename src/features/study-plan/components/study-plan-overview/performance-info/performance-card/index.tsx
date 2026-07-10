import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card } from '../../../../../../components/card'
import { faFire } from '@fortawesome/free-solid-svg-icons'

export function PerformanceCard() {
  return (
    <Card>
      <h3 className="font-bold text-slate-900 mb-4">Tu Rendimiento</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-sm text-slate-500">Promedio de Exámenes</span>
          <span className="font-bold text-slate-900 text-lg">90%</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-sm text-slate-500">Temas Completados</span>
          <span className="font-bold text-slate-900">1 de 3</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Racha de Estudio</span>
          <span className="font-bold text-amber-600 flex items-center gap-1">
            <FontAwesomeIcon icon={faFire} /> 4 Días
          </span>
        </div>
      </div>
    </Card>
  )
}
