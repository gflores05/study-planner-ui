import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@/components'
import { AssessmentStatus } from '../../types'
import { useAssessment } from '../../hooks/assessment.hooks'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useStudyPlan } from '@/features/study-plan/hooks/study-plan.hooks'

interface AssessmentActionsProps {
  selectedAnswer: string | null
}

export function AssessmentActions({ selectedAnswer }: AssessmentActionsProps) {
  const { studyPlanId } = useParams()
  const navigate = useNavigate()
  const {
    answer,
    moveNext,
    movePrevious,
    complete,
    assessment,
    isLastQuestion,
    question
  } = useAssessment()

  const { fetchStudyPlan } = useStudyPlan()

  const canMove = useMemo(
    () =>
      Boolean(selectedAnswer) &&
      assessment?.status === AssessmentStatus.IN_PROGRESS,
    [selectedAnswer, assessment]
  )

  async function nextQuestion() {
    if (!selectedAnswer || !assessment || !studyPlanId) {
      return
    }

    await answer(question.id, question.assessmentId, selectedAnswer)

    if (isLastQuestion) {
      await complete(assessment?.id)
      await fetchStudyPlan(studyPlanId)
      await navigate(`/study-plan/${studyPlanId}`)
      return
    }
    await moveNext()
  }

  async function previousQuestion() {
    if (selectedAnswer) {
      await answer(question.id, question.assessmentId, selectedAnswer)
      await movePrevious()
    }
  }

  return (
    <div className="mt-6 flex items-center justify-between">
      <Button disabled={!canMove} onClick={previousQuestion}>
        <FontAwesomeIcon icon={faArrowLeft} /> Previous
      </Button>
      <Button disabled={!canMove} variant="primary" onClick={nextQuestion}>
        {isLastQuestion ? 'Complete' : 'Next'}{' '}
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
  )
}
