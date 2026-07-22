import {
  AssessmentActions,
  AssessmentNavbar,
  AssessmentNavigation,
  AssessmentProgress,
  QuestionCard
} from '@/features/assessment'
import { useParams } from 'react-router'
import { useAssessment } from '../../hooks/assessment.hooks'
import { useEffect, useState } from 'react'
import { useTopic } from '@/features/topic/hooks/topic.hooks'
import { Loader2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

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

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

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

  useEffect(() => {
    if (question && question.selectedAnswer) {
      setSelectedAnswer(question.selectedAnswer)
      return
    }
    setSelectedAnswer(null)
  }, [question])

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
        {question ? (
          <QuestionCard
            question={question}
            onChangeAnswer={setSelectedAnswer}
            selectedAnswer={selectedAnswer}
          />
        ) : (
          <Spinner />
        )}
        <AssessmentActions selectedAnswer={selectedAnswer} />
      </AssessmentContainer>
      <AssessmentNavigation />
    </>
  )
}
