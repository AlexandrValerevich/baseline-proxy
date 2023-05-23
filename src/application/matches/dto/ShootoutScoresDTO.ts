interface ShootoutScoresDTO {
  shootoutsNumber: number
  scoreTeam: 'home' | 'away' | 'new_value'
  realised: boolean
}

export type { ShootoutScoresDTO }
