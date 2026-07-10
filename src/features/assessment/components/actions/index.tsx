import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../../../../components'

export function AssessmentActions() {
  return (
    <div className="mt-6 flex items-center justify-between">
      <Button>
        <FontAwesomeIcon icon={faArrowLeft} /> Anterior
      </Button>
      <Button variant="primary">
        Siguiente Pregunta <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
  )
}
