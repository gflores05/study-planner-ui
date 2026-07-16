import {
  AssessmentActions,
  AssessmentNavbar,
  AssessmentNavigation,
  AssessmentProgress,
  QuestionCard
} from '@/features/assessment'
import { useParams } from 'react-router'
import { useAssessment } from '../../hooks/assessment.hooks'
import { useEffect } from 'react'
import { useTopic } from '@/features/topic/hooks/topic.hooks'

interface AssessmentContainerProps {
  children: React.ReactNode
}
export function AssessmentContainer({ children }: AssessmentContainerProps) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
      {children}
    </main>
  )
}

export function AssessmentResolution() {
  const { assessmentId } = useParams()
  const {
    fetchAssessment,
    assessment,
    question,
    questionIndex,
    completedQuestions
  } = useAssessment()
  const { fetchTopic, topic } = useTopic()

  useEffect(() => {
    if (assessmentId) {
      fetchAssessment(assessmentId)
    }
  }, [assessmentId])

  useEffect(() => {
    if (assessment) {
      fetchTopic(assessment.topicId, false)
    }
  }, [assessment])

  return (
    <>
      <AssessmentNavbar topic={topic} />
      <AssessmentContainer>
        {assessment && question && (
          <AssessmentProgress
            current={questionIndex + 1}
            total={assessment.questions.length}
            completed={completedQuestions.length}
          />
        )}
        <QuestionCard />
        <AssessmentActions />
      </AssessmentContainer>
      <AssessmentNavigation />
    </>
  )
}
