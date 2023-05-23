type EventSource = 'game' | 'home' | 'away' | 'new_value'
type ChangeType = 'added' | 'removed' | 'restored' | 'new_value'

interface ScoutDTO {
  id: number
  matchId: number
  eventId: number
  dateTime: Date
  ingameTime: string
  owner: EventSource
  changeType: ChangeType
}

export type { ScoutDTO }
