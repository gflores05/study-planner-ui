import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  getStudyPlan,
  requestStudyPlan,
  selectCurrentStudyPlan,
  selectStudyPlanError,
  selectStudyPlanLoading
} from '../store'
import { useCallback, useState } from 'react'
import { WebSocketClient } from '@/services/ws.client'

export function useStudyPlan() {
  const dispatch = useAppDispatch()
  const studyPlan = useAppSelector(selectCurrentStudyPlan)
  const loading = useAppSelector(selectStudyPlanLoading)
  const error = useAppSelector(selectStudyPlanError)

  const [wsClient, setWsClient] = useState<WebSocketClient | null>(null)

  async function connectWS(id: string) {
    const wsClient = new WebSocketClient(id)

    setWsClient(wsClient)
  }

  const generateStudyPlan = useCallback(
    (subject: string, level: string, grade: number) =>
      dispatch(requestStudyPlan({ subject, level, grade })).unwrap(),
    [requestStudyPlan]
  )

  const fetchStudyPlan = useCallback(
    (id: string) => dispatch(getStudyPlan(id)),
    [getStudyPlan]
  )

  return {
    studyPlan,
    loading,
    error,
    wsClient,
    fetchStudyPlan,
    generateStudyPlan,
    connectWS
  }
}
