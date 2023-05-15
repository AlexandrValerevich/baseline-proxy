import { type MatchModel } from './MatchModel.js'
import { type ScoutModel } from './ScoutModel.js'

interface PredefinedResponsesModel {
  scouts: ScoutModel[]
  matches: MatchModel[]
}

export type { PredefinedResponsesModel }
