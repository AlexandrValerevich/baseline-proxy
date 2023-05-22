interface ScoutModel {
  id: number
  owned: 'game' | 'home' | 'away'
  matchId: number
  eventId: number
  ingameTime: string
  changeType?: 'ADDED' | 'REMOVED' | 'RESTORED'
  timestamp?: number
}

export type { ScoutModel }
