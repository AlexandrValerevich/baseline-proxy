import { type interfaces } from 'inversify'
import {
  DirectMatchService,
  type IBaseLineClient,
  type IMatchService,
  type IModeConfigurationService,
  type IRandomMatchGenerator,
  type MatchDTO,
  MatchServiceLoggerDecorator,
  RandomMatchService
} from '../../application/index.js'
import { TYPES } from '../types.js'

const matchServiceResolver = (context: interfaces.Context): IMatchService => {
  const modeService = context.container.get<IModeConfigurationService>(
    TYPES.ModeConfigurationService
  )
  const mode = modeService.getMode()
  let matchService: IMatchService
  switch (mode) {
    case 'direct':
      matchService = new DirectMatchService(
        context.container.get<IBaseLineClient>(TYPES.BaseLineClient)
      )
      break
    case 'random': {
      const matchGenerator = context.container.get<IRandomMatchGenerator>(
        TYPES.RandomMatchGenerator
      )
      matchService = new RandomMatchService(matchGenerator)
      break
    }
    case 'error_once':
      matchService = {
        getMatches: async (): Promise<MatchDTO[]> => {
          modeService.throwOnceError()
          return []
        }
      }
      break
    case 'error_infinity':
      matchService = {
        getMatches: async (): Promise<MatchDTO[]> => {
          modeService.throwInfinityError()
          return []
        }
      }
      break
    case 'predefined_response':
      matchService = {
        getMatches: async (): Promise<MatchDTO[]> => {
          return modeService.getPredefinedMatches()
        }
      }
      break
    default: {
      throw new Error("Can't resolve MatchService due to unknown mode.")
    }
  }
  return new MatchServiceLoggerDecorator(matchService)
}

export { matchServiceResolver }
