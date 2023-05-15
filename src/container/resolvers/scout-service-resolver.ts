import { type interfaces } from 'inversify'
import {
  DirectScoutService,
  type IBaseLineClient,
  type IModeConfigurationService,
  type IRandomScoutGenerator,
  type IScoutService,
  RandomScoutService,
  type ScoutDTO,
  ScoutServiceLoggerDecorator
} from '../../application/index.js'
import { TYPES } from '../types.js'

const scoutServiceResolver = (context: interfaces.Context): IScoutService => {
  const modeService = context.container.get<IModeConfigurationService>(
    TYPES.ModeConfigurationService
  )
  const mode = modeService.getMode()
  let scoutService: IScoutService
  switch (mode) {
    case 'direct': {
      const client = context.container.get<IBaseLineClient>(TYPES.BaseLineClient)
      scoutService = new DirectScoutService(client)
      break
    }
    case 'random': {
      const scoutGenerator = context.container.get<IRandomScoutGenerator>(
        TYPES.RandomScoutGenerator
      )
      scoutService = new RandomScoutService(scoutGenerator)
      break
    }
    case 'error_once':
      scoutService = {
        getScouts: async (): Promise<ScoutDTO[]> => {
          modeService.throwOnceError()
          return []
        }
      }
      break
    case 'error_infinity':
      scoutService = {
        getScouts: async (): Promise<ScoutDTO[]> => {
          modeService.throwInfinityError()
          return []
        }
      }
      break
    case 'predefined_response':
      scoutService = {
        getScouts: async (): Promise<ScoutDTO[]> => {
          return modeService.getPredefinedScouts()
        }
      }
      break
    default: {
      throw Error("Can't resolve ScoutService implementation due to unknown mode.")
    }
  }

  return new ScoutServiceLoggerDecorator(scoutService)
}

export { scoutServiceResolver }
