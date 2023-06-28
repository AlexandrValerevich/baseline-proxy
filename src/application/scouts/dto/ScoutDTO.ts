type EventSource = 'game' | 'home' | 'away' | 'new_value'
type ChangeType = 'added' | 'removed' | 'restored' | 'edited' | 'new_value'

interface ScoutDTO {
  id: number
  matchId: number
  eventId: number
  eventName: string
  dateTime: Date
  ingameTime: string
  owner: EventSource
  changeType: ChangeType
  period: number
  additional?: {
    playerId: number
    player: string
    assistingPlayerId: number
    assistingPlayer: string
  }
}

export type { ScoutDTO }
