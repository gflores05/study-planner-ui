import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Assessment } from '../types'
import { AssessmentService } from '../services/assessment.service'
import { AssessmentMapper } from '../mappers/assessment.mapper'

export const getAssessment = createAsyncThunk<
  Assessment,
  string,
  { rejectValue: string }
>('assessment/get', async (id, { rejectWithValue }) => {
  try {
    const response = await AssessmentService.get(id)

    return AssessmentMapper.fromDTO(response)
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const startAssessment = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('assessment/start', async (id, { rejectWithValue }) => {
  try {
    const response = await AssessmentService.start(id)

    return response.assessment_id
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const completeAssessment = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('assessment/complete', async (id, { rejectWithValue }) => {
  try {
    const response = await AssessmentService.complete(id)

    return response.assessment_id
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const answerQuestion = createAsyncThunk<
  { questionId: string; assessmentId: string; selectedAnswer: string },
  { questionId: string; assessmentId: string; selectedAnswer: string },
  { rejectValue: string }
>('assessment/answer', async (params, { rejectWithValue }) => {
  try {
    const response = await AssessmentService.answer(
      params.assessmentId,
      params.questionId,
      params.selectedAnswer
    )

    return {
      questionId: response.question_id,
      assessmentId: response.assessment_id,
      selectedAnswer: params.selectedAnswer
    }
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})
