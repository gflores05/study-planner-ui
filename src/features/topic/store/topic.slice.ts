import { createSlice } from '@reduxjs/toolkit'
import type { Topic } from '../types'
import { getTopic } from './topic.thunks'

interface TopicState {
  current: Topic | null
  error: string | null
  loading: boolean
}

const initialState: TopicState = {
  current: null,
  error: null,
  loading: false
}

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Handle the getTopic thunk actions
    builder
      .addCase(getTopic.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getTopic.fulfilled, (state, action) => {
        state.loading = false
        state.current = action.payload
      })
      .addCase(getTopic.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string | null
      })
  }
})

export const {} = topicSlice.actions
export default topicSlice.reducer
