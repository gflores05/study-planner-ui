import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { SubTopic } from '@/features/topic/types'
import { faBook, faBookOpen, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo } from 'react'

interface StudyMaterialListProps {
  studyMaterial: string[]
}

function StudyMaterialList({ studyMaterial }: StudyMaterialListProps) {
  return (
    <div className="py-4">
      <h4 className="font-semibold text-slate-900 text-sm">Study Material</h4>
      <ul className="mt-1 text-sm text-slate-600">
        {studyMaterial.map(sm => (
          <li>
            <FontAwesomeIcon icon={faBook} /> {sm}
          </li>
        ))}
      </ul>
    </div>
  )
}

interface SubTopicCardProps {
  subTopic: SubTopic
  order: number
}

export function SubTopicCard({ subTopic, order }: SubTopicCardProps) {
  const hours = useMemo(() => {
    return subTopic.studyMaterial.length * 2
  }, [subTopic])

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 animate-pulse">
            <FontAwesomeIcon icon={faBookOpen} className="text-lg" />
          </div>
          <div>
            <Badge variant="info" className="mb-1 rounded-md">
              Studying now
            </Badge>
            <h3 className="font-semibold text-slate-900">
              Sub Topic {order}: {subTopic.title}
            </h3>
            {/* <p className="mt-1 text-sm text-slate-600">{subtopics}</p> */}
            <StudyMaterialList studyMaterial={subTopic.studyMaterial} />
            <div className="mt-3 flex gap-2">
              <Badge variant="muted" className="h-auto rounded-md px-2 py-1">
                <FontAwesomeIcon icon={faClock} /> {hours} days
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
