import { useTopic } from '../../hooks/topic.hooks'
import { SubTopicCard } from './sub-topic-card'

export function SubTopicsList() {
  const { topic } = useTopic()

  if (!topic) {
    return null
  }

  return (
    <div className="space-y-4">
      {topic.subTopics.map((subtopic, index) => (
        <SubTopicCard subTopic={subtopic} order={index + 1} />
      ))}
    </div>
  )
}
