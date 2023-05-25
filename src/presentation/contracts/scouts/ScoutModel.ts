interface ScoutModel {
  id: number
  owner: 'game' | 'home' | 'away' | 'new_value'
  matchId: number
  eventId: number
  ingameTime: string
  changeType: 'added' | 'removed' | 'restored' | 'new_value'
  dateTime: Date
  period: number
}

export type { ScoutModel }
