import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  getTopic,
  selectTopicError,
  selectTopicLoading,
  selectCurrentTopic
} from '../store'
import { useCallback } from 'react'

export function useTopic() {
  const dispatch = useAppDispatch()
  const topic = useAppSelector(selectCurrentTopic)
  const loading = useAppSelector(selectTopicLoading)
  const error = useAppSelector(selectTopicError)

  const fetchTopic = useCallback(
    (id: string, includeChildren: boolean) => {
      dispatch(getTopic({ id, includeChildren }))
    },
    [getTopic]
  )

  return { topic, loading, error, fetchTopic }
}
