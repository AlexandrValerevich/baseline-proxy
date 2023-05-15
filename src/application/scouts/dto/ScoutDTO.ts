type TeamType = 1 | 2 | undefined
type ChangeType = 'ADDED' | 'REMOVED' | 'RESTORED' | undefined

interface ScoutDTO {
  id: number
  matchId: number
  team?: TeamType
  eventId: number
  scoutTime: string
  timestamp?: number
  changeType?: ChangeType
}

export type { ScoutDTO }
