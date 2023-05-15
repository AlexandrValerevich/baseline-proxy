import { type BetStopStatusModel } from './BetStopStatusModel.js'
import { type BetStopTypeModel } from './BetStopTypeModel.js'

interface BetStopModel {
  type: BetStopTypeModel
  value: BetStopStatusModel
  updatedBy: string
  updatedAt: string
}

export type { BetStopModel }
