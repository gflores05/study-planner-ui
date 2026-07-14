import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  getStudyPlan,
  requestStudyPlan,
  selectCurrentStudyPlan,
  selectStudyPlanError,
  selectStudyPlanLoading
} from '../store'
import { useEffect, useState } from 'react'
import { WebSocketClient } from '@/services/ws.client'

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
  const [wsClient, setWsClient] = useState<WebSocketClient | null>(null)
  const dispatch = useAppDispatch()
  const studyPlan = useAppSelector(selectCurrentStudyPlan)
  const loading = useAppSelector(selectStudyPlanLoading)
  const error = useAppSelector(selectStudyPlanError)

  async function fetchStudyPlan() {
    if (studyPlanId) {
      await dispatch(getStudyPlan(studyPlanId))
    }
  }

  useEffect(() => {
    if (studyPlanId) {
      // Fetch Requested Study Plan
      fetchStudyPlan()

      // Listen for updates
      const wsClient = new WebSocketClient(studyPlanId)

      setWsClient(wsClient)
    }
  }, [studyPlanId])

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

  return {
    generateStudyPlan,
    fetchStudyPlan,
    studyPlanId,
    studyPlan,
    loading,
    error,
    wsClient
  }
}
