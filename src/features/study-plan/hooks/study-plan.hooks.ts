import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  getStudyPlan,
  requestStudyPlan,
  selectCurrentStudyPlan,
  selectStudyPlanError,
  selectStudyPlanLoading
} from '../store'
import { useEffect, useState } from 'react'

export function useStudyPlan(id: string) {
  const dispatch = useAppDispatch()
  const currentStudyPlan = useAppSelector(selectCurrentStudyPlan)
  const loading = useAppSelector(selectStudyPlanLoading)
  const error = useAppSelector(selectStudyPlanError)

  useEffect(() => {
    if (id) {
      dispatch(getStudyPlan(id))
    }
  }, [id, dispatch])

  return { currentStudyPlan, loading, error }
}

export function useGenerateStudyPlan() {
  const [studyPlanId, setStudyPlanId] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectStudyPlanLoading)
  const error = useAppSelector(selectStudyPlanError)

  async function generateStudyPlan(
    subject: string,
    level: string,
    grade: number
  ) {
    const id = await dispatch(
      requestStudyPlan({ subject, level, grade })
    ).unwrap()
    setStudyPlanId(id)
  }

  return { generateStudyPlan, studyPlanId, loading, error }
}
