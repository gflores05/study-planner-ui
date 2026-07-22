import { Button, Title } from '@/components'
import { Link, useParams } from 'react-router'
import { useTopic } from '../../hooks/topic.hooks'
import { useEffect, useMemo } from 'react'
import { SubTopicsList } from '../sub-topics-list'

export function TopicInfo() {
  const { topicId, studyPlanId } = useParams()
  const { topic, fetchTopic } = useTopic()

  useEffect(() => {
    if (topicId) {
      fetchTopic(topicId, true)
    }
  }, [topicId])

  const createdOn = useMemo(() => {
    if (!topic) {
      return
    }

    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full'
    }).format(new Date(topic.createdOn))
  }, [topic])

  if (!topic) {
    return null
  }

  return (
    <div className="lg:col-span-2 space-y-6">
      <Title
        title={`Active Topic: ${topic.title}`}
        subtitle={`Created on ${createdOn}`}
        additionalInfo={
          <Button variant="inverted" size="small">
            <Link to={`/study-plan/${studyPlanId}`}>Back to study plan</Link>
          </Button>
        }
      />
      <SubTopicsList />
    </div>
  )
}
