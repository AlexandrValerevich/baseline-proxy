import { Container } from 'inversify'
import { GraphQLClient } from 'graphql-request'

import { TYPES } from './types.js'
import {
  BaseLineClient,
  type IBaseLineClient,
  BaseLineClientLoggerDecorator
} from '../application/baseline/index.js'
import {
  type IModeConfigurationService,
  ModeConfigurationService
} from '../application/mode/index.js'
import { type IRandomMatchGenerator, RandomMatchGenerator } from '../application/matches/index.js'
import { type IMatchService } from '../application/matches/IMatchService.js'
import { type IRandomScoutGenerator, RandomScoutGenerator } from '../application/scouts/index.js'
import { type IScoutService } from '../application/scouts/IScoutService.js'
import { scoutServiceResolver, matchServiceResolver } from './resolvers/index.js'

const container = new Container()

container
  .bind<IModeConfigurationService>(TYPES.ModeConfigurationService)
  .to(ModeConfigurationService)
  .inSingletonScope()
container
  .bind<IRandomMatchGenerator>(TYPES.RandomMatchGenerator)
  .to(RandomMatchGenerator)
  .inSingletonScope()
container
  .bind<IRandomScoutGenerator>(TYPES.RandomScoutGenerator)
  .to(RandomScoutGenerator)
  .inSingletonScope()

container
  .bind<GraphQLClient>(TYPES.GraphQlBaseLineClient)
  .toDynamicValue(() => {
    const address = process.env.BaseLineClient__Address
    if (address === undefined) {
      throw new Error('BaseLineClient__Address environment variable not provided.')
    }
    return new GraphQLClient(address)
  })
  .inRequestScope()

container
  .bind<IBaseLineClient>(TYPES.BaseLineClient)
  .toDynamicValue((context) => {
    const graphQlClint = context.container.get<GraphQLClient>(TYPES.GraphQlBaseLineClient)
    const baseLineClient = new BaseLineClient(graphQlClint)
    return new BaseLineClientLoggerDecorator(baseLineClient)
  })
  .inRequestScope()

container
  .bind<IScoutService>(TYPES.ScoutsService)
  .toDynamicValue(scoutServiceResolver)
  .inRequestScope()
container
  .bind<IMatchService>(TYPES.MatchesService)
  .toDynamicValue(matchServiceResolver)
  .inRequestScope()

export { container }
