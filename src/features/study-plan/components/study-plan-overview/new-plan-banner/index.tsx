import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Content } from '@/components'
import { Button } from '@/components/ui/button'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'
import { useStudyPlan } from '@/features/study-plan/hooks/study-plan.hooks'

export function NewPlanBanner() {
  const navigate = useNavigate()
  const { resetStudyPlan } = useStudyPlan()

  async function goToNewPlan() {
    await resetStudyPlan()
    await navigate('/start')
  }

  return (
    <Content variant="primary">
      <h1 className="text-2xl font-bold sm:text-3xl">
        Hello again! Ready to study?
      </h1>
      <p className="mt-2 text-indigo-100">
        Here is your progress on your current study plan. Complete the readings
        and test your knowledge with the generated quizzes.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Button variant="secondary" onClick={() => goToNewPlan()}>
          <FontAwesomeIcon icon={faPlus} /> New Study Plan
        </Button>
      </div>
    </Content>
  )
}
