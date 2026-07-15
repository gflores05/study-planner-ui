import type { StudyPlan } from '@/features/study-plan/types'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo } from 'react'

interface AISuggestionProps {
  studyPlan: StudyPlan
}

export function AISuggestion({ studyPlan }: AISuggestionProps) {
  const suggestion = useMemo(() => {
    return `Study these topics: ${studyPlan.topics.map(t => t.title).join(', ')}`
  }, [studyPlan])
  return (
    <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-6 shadow-sm">
      <div className="flex items-center gap-2 text-amber-800 font-bold mb-2">
        <FontAwesomeIcon icon={faLightbulb} />
        <h4>AI suggestion</h4>
      </div>
      <p className="text-sm text-amber-900/80 leading-relaxed">{suggestion}</p>
    </div>
  )
}
