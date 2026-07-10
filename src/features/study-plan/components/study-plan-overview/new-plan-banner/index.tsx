import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Content } from '@/components'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export function NewPlanBanner() {
  return (
    <Content variant="primary">
      <h1 className="text-2xl font-bold sm:text-3xl">
        ¡Hola de nuevo! Listo para estudiar?
      </h1>
      <p className="mt-2 text-indigo-100">
        Aquí tienes el progreso de tu plan de estudios actual. Completa las
        lecturas y pon a prueba tus conocimientos con los exámenes generados.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Button variant="inverted" size="medium">
          <FontAwesomeIcon icon={faPlus} /> Nuevo Plan de Estudios
        </Button>
      </div>
    </Content>
  )
}
