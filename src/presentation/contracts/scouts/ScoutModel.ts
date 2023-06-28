interface ScoutModel {
  id: number
  owner: 'game' | 'home' | 'away' | 'new_value'
  matchId: number
  eventId: number
  eventName: string
  ingameTime: string
  changeType: 'added' | 'removed' | 'restored' | 'edited' | 'new_value'
  dateTime: Date
  period: number
  additional?: {
    playerId: number
    player: string
    assistingPlayerId: number,
    assistingPlayer: string
  }
}

export type { ScoutModel }
