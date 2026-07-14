import type { RealtimeEvent } from '@/lib/realtime-event'
import { Subject } from 'rxjs'

export class WebSocketClient {
  public events$ = new Subject<RealtimeEvent>()
  public connectionEvents$ = new Subject<'opened' | 'closed'>()

  private socket: WebSocket

  constructor(userId: string) {
    this.socket = new WebSocket(`${import.meta.env.VITE_WS_URL}/ws/${userId}`)

    this.socket.onopen = () => {
      this.connectionEvents$.next('opened')
    }

    this.socket.onmessage = rtEvent => {
      const event = JSON.parse(rtEvent.data) as RealtimeEvent

      this.events$.next(event)
    }

    this.socket.onclose = () => {
      this.connectionEvents$.next('closed')
    }
  }

  dispose() {
    this.socket.close()
    this.events$.unsubscribe()
    this.connectionEvents$.unsubscribe()
  }
}
