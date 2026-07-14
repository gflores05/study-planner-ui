export type RealTimeEventName = 'ReportStudyPlanGeneratedCommand'

export interface RealtimeEventPayload {
  event_name: RealTimeEventName
  event_id: string
  occurred_on: Date
}

export interface RealtimeEvent {
  event_name: RealTimeEventName
  payload: RealtimeEventPayload
}
