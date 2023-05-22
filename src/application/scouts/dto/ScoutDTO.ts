type EventSource = 'game' | 'home' | 'away'
type ChangeType = 'ADDED' | 'REMOVED' | 'RESTORED' | undefined

interface ScoutDTO {
  id: number
  matchId: number
  owned: EventSource
  eventId: number
  ingameTime: string
  timestamp?: number
  changeType?: ChangeType
}

export type { ScoutDTO }
