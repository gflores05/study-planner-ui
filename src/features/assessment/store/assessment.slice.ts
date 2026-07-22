import { createSlice } from '@reduxjs/toolkit'
import type { Assessment, Question } from '../types'
import {
  answerQuestion,
  completeAssessment,
  getAssessment,
  startAssessment
} from './assessment.thunks'

interface AssessmentState {
  current: Assessment | null
  questions: Question[]
  error: string | null
  loading: boolean
  currentQuestion: number
}

const initialState: AssessmentState = {
  current: null,
  error: null,
  loading: false,
  currentQuestion: -1,
  questions: []
}

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    nextQuestion: state => {
      if (!state.current) {
        return
      }
      if (state.currentQuestion < state.questions.length - 1) {
        state.currentQuestion = state.currentQuestion + 1
      }
    },
    prevQuestion: state => {
      if (!state.current) {
        return
      }
      if (state.currentQuestion > 0) {
        state.currentQuestion = state.currentQuestion - 1
      }
    }
  },
  extraReducers: builder => {
    // Handle the getAssessment thunk actions
    builder
      .addCase(getAssessment.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getAssessment.fulfilled, (state, action) => {
        state.loading = false
        state.current = action.payload
        state.questions = action.payload.questions
        state.currentQuestion = 0
      })
      .addCase(getAssessment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string | null
      })

    // Handle the startAssessment thunk actions
    builder
      .addCase(startAssessment.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(startAssessment.fulfilled, state => {
        state.loading = false
      })
      .addCase(startAssessment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string | null
      })

    // Handle the completeAssessment thunk actions
    builder
      .addCase(completeAssessment.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(completeAssessment.fulfilled, state => {
        state.loading = false
      })
      .addCase(completeAssessment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string | null
      })

    // Handle the answerQuestion thunk actions
    builder
      .addCase(answerQuestion.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(answerQuestion.fulfilled, (state, { payload }) => {
        state.loading = false
        state.questions = state.questions.map(q =>
          q.id === payload.questionId
            ? { ...q, selectedAnswer: payload.selectedAnswer }
            : q
        )
      })
      .addCase(answerQuestion.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string | null
      })
  }
})

export const { nextQuestion, prevQuestion } = assessmentSlice.actions
export default assessmentSlice.reducer
