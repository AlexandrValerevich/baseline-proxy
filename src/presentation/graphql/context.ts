import { type Container } from 'inversify'
import {
  type IScoutService,
  type IMatchService,
  type IModeConfigurationService
} from '../../application/index.js'
import { type BaseContext } from '@apollo/server'

interface IContext extends BaseContext {
  serviceProvider: Container
  scoutService: IScoutService
  matchesService: IMatchService
  modeConfigurationsService: IModeConfigurationService
}

export type { IContext }
