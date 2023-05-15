interface ScoutModel {
  id: number
  team: string
  matchId: number
  eventName: string
  eventId: number
  minutes: string
  timeOfEvent: string
  stage: number
  eventTimestamp: number
  playerId?: number
  player?: string
  triggerId?: string
  changeType?: 'ADDED' | 'REMOVED' | 'SYSTEM'
  timestamp?: number
}

export type { ScoutModel }
