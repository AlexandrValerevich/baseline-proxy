import { type MatchModel } from '../matches/index.js'
import { type ScoutModel } from '../scouts/index.js'

interface PredefinedResponsesModel {
  scouts: ScoutModel[]
  matches: MatchModel[]
}

export type { PredefinedResponsesModel }
