import { createAsyncThunk } from '@reduxjs/toolkit'
import { StudyPlanService } from '../services/study-plan.service'
import type { GenerateStudyPlanRequest } from '../dtos/study-plan.dto'
import type { StudyPlan } from '../types'
import { StudyPlanMapper } from '../mappers/study-plan.mapper'

export const requestStudyPlan = createAsyncThunk<
  string,
  GenerateStudyPlanRequest,
  { rejectValue: string }
>('studyPlan/request', async (request, { rejectWithValue }) => {
  try {
    const response = await StudyPlanService.request(request)
    return response.id
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const getStudyPlan = createAsyncThunk<
  StudyPlan,
  string,
  { rejectValue: string }
>('studyPlan/get', async (id, { rejectWithValue }) => {
  try {
    const response = await StudyPlanService.get(id)

    return StudyPlanMapper.fromDTO(response)
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})
