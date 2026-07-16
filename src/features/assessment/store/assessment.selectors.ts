import { createSelector } from '@reduxjs/toolkit'
import { type RootState } from '@/app/store'

export const selectAssessmentState = (state: RootState) => state.assessment

export const selectCurrentAssessment = createSelector(
  selectAssessmentState,
  assessmentState => assessmentState.current
)

export const selectAssessmentLoading = createSelector(
  selectAssessmentState,
  assessmentState => assessmentState.loading
)

export const selectAssessmentError = createSelector(
  selectAssessmentState,
  assessmentState => assessmentState.error
)

export const selectCurrentQuestion = createSelector(
  selectAssessmentState,
  assessmentState => assessmentState.questions[assessmentState.currentQuestion]
)

export const selectCurrentQuestionIndex = createSelector(
  selectAssessmentState,
  assessmentState => assessmentState.currentQuestion
)

export const selectIsQuestionAnswered = createSelector(
  selectCurrentQuestion,
  currentQuestion => Boolean(currentQuestion.selectedAnswer)
)

export const selectCompletedQuestions = createSelector(
  selectAssessmentState,
  assessmentState => assessmentState.questions.filter(q => q.selectedAnswer)
)
