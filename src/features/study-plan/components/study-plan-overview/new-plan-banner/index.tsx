import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Content } from '@/components'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router'

export function NewPlanBanner() {
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
        <Button variant="inverted" size="medium">
          <NavLink to={'/study-plan'} end>
            <FontAwesomeIcon icon={faPlus} /> New Study Plan
          </NavLink>
        </Button>
      </div>
    </Content>
  )
}
