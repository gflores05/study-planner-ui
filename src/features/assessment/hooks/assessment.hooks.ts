import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  getAssessment,
  selectAssessmentError,
  selectAssessmentLoading,
  selectCompletedQuestions,
  selectCurrentAssessment,
  selectCurrentQuestion,
  selectCurrentQuestionIndex
} from '../store'
import { useCallback } from 'react'

export function useAssessment() {
  const dispatch = useAppDispatch()
  const assessment = useAppSelector(selectCurrentAssessment)
  const loading = useAppSelector(selectAssessmentLoading)
  const error = useAppSelector(selectAssessmentError)
  const question = useAppSelector(selectCurrentQuestion)
  const questionIndex = useAppSelector(selectCurrentQuestionIndex)
  const completedQuestions = useAppSelector(selectCompletedQuestions)

  const fetchAssessment = useCallback(
    (id: string) => {
      dispatch(getAssessment(id))
    },
    [getAssessment]
  )

  return {
    assessment,
    loading,
    error,
    question,
    questionIndex,
    completedQuestions,
    fetchAssessment
  }
}
