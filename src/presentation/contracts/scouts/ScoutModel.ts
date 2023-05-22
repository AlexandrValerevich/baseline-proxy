interface ScoutModel {
  id: number
  owner: 'game' | 'home' | 'away'
  matchId: number
  eventId: number
  ingameTime: string
  changeType: 'added' | 'removed' | 'restored'
  dateTime: Date
}

export type { ScoutModel }
