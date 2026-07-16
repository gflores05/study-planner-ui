import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Topic } from '../types'
import { TopicService } from '../services/topic.service'
import { TopicMapper } from '../mappers/topic.mapper'

export const getTopic = createAsyncThunk<
  Topic,
  { id: string; includeChildren: boolean },
  { rejectValue: string }
>('topic/get', async ({ id, includeChildren }, { rejectWithValue }) => {
  try {
    const response = await TopicService.get(id, includeChildren)

    return TopicMapper.fromDTO(response)
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})
