import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  answerQuestion,
  completeAssessment,
  getAssessment,
  nextQuestion,
  prevQuestion,
  selectAssessmentError,
  selectAssessmentLoading,
  selectCompletedQuestions,
  selectCurrentAssessment,
  selectCurrentQuestion,
  selectCurrentQuestionIndex,
  selectIsLastQuestion,
  selectQuestions,
  startAssessment
} from '../store'
import { useCallback } from 'react'

export function useAssessment() {
  const dispatch = useAppDispatch()
  const assessment = useAppSelector(selectCurrentAssessment)
  const loading = useAppSelector(selectAssessmentLoading)
  const error = useAppSelector(selectAssessmentError)
  const question = useAppSelector(selectCurrentQuestion)
  const questions = useAppSelector(selectQuestions)
  const questionIndex = useAppSelector(selectCurrentQuestionIndex)
  const completedQuestions = useAppSelector(selectCompletedQuestions)
  const isLastQuestion = useAppSelector(selectIsLastQuestion)

  const fetchAssessment = useCallback(
    (id: string) => dispatch(getAssessment(id)),
    [getAssessment]
  )

  const start = useCallback(
    async (id: string) => dispatch(startAssessment(id)),
    [startAssessment]
  )

  const answer = useCallback(
    async (questionId: string, assessmentId: string, selectedAnswer: string) =>
      dispatch(answerQuestion({ questionId, assessmentId, selectedAnswer })),
    [answerQuestion]
  )

  const complete = useCallback(
    async (id: string) => dispatch(completeAssessment(id)),
    [completeAssessment]
  )

  const moveNext = useCallback(
    async () => dispatch(nextQuestion()),
    [nextQuestion]
  )

  const movePrevious = useCallback(
    () => dispatch(prevQuestion()),
    [prevQuestion]
  )

  return {
    assessment,
    loading,
    error,
    question,
    questionIndex,
    completedQuestions,
    questions,
    isLastQuestion,
    fetchAssessment,
    answer,
    moveNext,
    movePrevious,
    start,
    complete
  }
}
