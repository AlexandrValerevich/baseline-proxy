type EventSource = 'game' | 'home' | 'away'
type ChangeType = 'added' | 'removed' | 'restored'

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
