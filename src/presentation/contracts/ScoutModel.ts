interface ScoutModel {
  id: number
  team?: 1 | 2
  matchId: number
  eventId: number
  scoutTime: string
  changeType?: 'ADDED' | 'REMOVED' | 'RESTORED'
  timestamp?: number
}

export type { ScoutModel }
