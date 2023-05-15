import { type MatchDTO } from '../dto/index.js'

interface IRandomMatchGenerator {
  generate: () => MatchDTO
  generateArray: (count: number) => MatchDTO[]
}

export type { IRandomMatchGenerator }
