import { TYPES } from "./types.js";
import { Container } from "inversify";
import { GraphQLClient } from "graphql-request";
import { matchServiceResolver, scoutServiceResolver } from "./resolvers/index.js";
import { BaseLineClient, IBaseLineClient } from "../application/baseline/index.js";
import { IModeConfigurationService, ModeConfigurationService } from "../application/mode/index.js";
import {
  IMatchService,
  IRandomMatchGenerator,
  RandomMatchGenerator,
} from "../application/matches/index.js";
import {
  IRandomScoutGenerator,
  RandomScoutGenerator,
  IScoutService,
} from "../application/scouts/index.js";

const container = new Container();

container
  .bind<IModeConfigurationService>(TYPES.ModeConfigurationService)
  .to(ModeConfigurationService)
  .inSingletonScope();

container
  .bind<IRandomMatchGenerator>(TYPES.RandomMatchGenerator)
  .to(RandomMatchGenerator)
  .inSingletonScope();

container
  .bind<IRandomScoutGenerator>(TYPES.RandomScoutGenerator)
  .to(RandomScoutGenerator)
  .inSingletonScope();

container
  .bind<GraphQLClient>(TYPES.GraphQlBaseLineClient)
  .toDynamicValue(() => {
    const address = process.env.BaseLineClient__Address;
    if (!address) {
      throw new Error("BaseLineClient__Address environment variable not provided.");
    }
    return new GraphQLClient(process.env.BaseLineClient__Address ?? "");
  })
  .inRequestScope();

container.bind<IBaseLineClient>(TYPES.BaseLineClient).to(BaseLineClient).inRequestScope();

container
  .bind<IScoutService>(TYPES.ScoutsService)
  .toDynamicValue(scoutServiceResolver)
  .inRequestScope();

container
  .bind<IMatchService>(TYPES.MatchesService)
  .toDynamicValue(matchServiceResolver)
  .inRequestScope();

export { container };
