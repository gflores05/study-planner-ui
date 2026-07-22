import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card } from '@/components'
import {
  faAward,
  faBookOpen,
  faCircleCheck,
  faClock,
  faLock,
  faPenToSquare
} from '@fortawesome/free-solid-svg-icons'
import type { Topic } from '@/features/topic/types'
import { useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useAssessment } from '@/features/assessment/hooks/assessment.hooks'
import { AssessmentStatus } from '@/features/assessment'

interface CompletedTopicCardProps {
  topic: Topic
  order: number
}

export function CompletedTopicCard({ topic, order }: CompletedTopicCardProps) {
  const subtopics = useMemo(() => {
    return topic.subTopics.map(st => st.title).join(', ')
  }, [topic])

  const hours = useMemo(() => {
    return topic.subTopics.length * 2
  }, [topic])

  return (
    <Card hover>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <FontAwesomeIcon icon={faCircleCheck} className="text-lg" />
          </div>
          <div>
            <h3 className="font-semibold line-through text-slate-400">
              Topic {order}: {topic.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{subtopics}</p>
            <div className="mt-3 flex gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                <FontAwesomeIcon icon={faClock} /> {hours} hours
              </span>
            </div>
          </div>
        </div>
        <Button variant="success" size="small">
          <FontAwesomeIcon icon={faAward} className="mr-1" /> Exam:{' '}
          {topic.assessment?.score}/100
        </Button>
      </div>
    </Card>
  )
}

interface InProgressTopicCardProps {
  topic: Topic
  order: number
  studyPlanId: string
}

export function InProgressTopicCard({
  topic,
  order,
  studyPlanId
}: InProgressTopicCardProps) {
  const { start } = useAssessment()
  const navigate = useNavigate()

  const subtopics = useMemo(() => {
    return topic.subTopics.map(st => st.title).join(', ')
  }, [topic])

  const hours = useMemo(() => {
    return topic.subTopics.length * 2
  }, [topic])

  async function startAssessment() {
    if (!topic.assessment) {
      return
    }

    if (topic.assessment.status === AssessmentStatus.PENDING) {
      await start(topic.assessment?.id)
    }

    await navigate(
      `/study-plan/${studyPlanId}/assessment/${topic.assessment?.id}`
    )
  }

  return (
    <Card selected>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 animate-pulse">
            <FontAwesomeIcon icon={faBookOpen} className="text-lg" />
          </div>
          <div>
            <span className="inline-block rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 mb-1">
              Studying now
            </span>
            <h3 className="font-semibold text-slate-900">
              Topic {order}: {topic.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{subtopics}</p>
            <div className="mt-3 flex gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                <FontAwesomeIcon icon={faClock} /> {hours} hours
              </span>
            </div>
          </div>
        </div>
        <Button variant="primary" size="small" onClick={startAssessment}>
          <FontAwesomeIcon icon={faPenToSquare} />{' '}
          {topic.assessment?.status === AssessmentStatus.IN_PROGRESS
            ? 'Continue Exam'
            : 'Take Exam'}
        </Button>
      </div>
    </Card>
  )
}

interface PendingTopicCardProps {
  topic: Topic
  order: number
}

export function PendingTopicCard({ topic, order }: PendingTopicCardProps) {
  const subtopics = useMemo(() => {
    return topic.subTopics.map(st => st.title).join(', ')
  }, [topic])

  const hours = useMemo(() => {
    return topic.subTopics.length * 2
  }, [topic])

  return (
    <Card disabled>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
            <FontAwesomeIcon icon={faLock} className="text-lg" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-700">
              Topic {order}: {topic.title}
            </h3>
            <p className="mt-1 text-sm text-slate-400">{subtopics}</p>
            <div className="mt-3 flex gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-400">
                <FontAwesomeIcon icon={faClock} /> {hours} hours
              </span>
            </div>
          </div>
        </div>
        <Button disabled size="small">
          Bloqueado
        </Button>
      </div>
    </Card>
  )
}
