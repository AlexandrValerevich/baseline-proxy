import { TYPES } from "./types.js";
import { Container } from "inversify";
import { GraphQLClient } from "graphql-request";
import { BaseLineClient, IBaseLineClient } from "../application/baseline/index.js";
import {
  ModeDTO,
  IModeConfigurationService,
  ModeConfigurationService,
} from "../application/mode/index.js";
import {
  DirectMatchService,
  IMatchService,
  IRandomMatchGenerator,
  RandomMatchGenerator,
  RandomMatchService,
} from "../application/matches/index.js";
import {
  IScoutService,
  DirectScoutService,
  RandomScoutService,
  IRandomScoutGenerator,
  RandomScoutGenerator,
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
  .toDynamicValue(() => new GraphQLClient(process.env.BaseLineClient__Address))
  .inRequestScope();

container.bind<IBaseLineClient>(TYPES.BaseLineClient).to(BaseLineClient).inRequestScope();

container
  .bind<IScoutService>(TYPES.ScoutsService)
  .toDynamicValue((context) => {
    const modeService = context.container.get<IModeConfigurationService>(
      TYPES.ModeConfigurationService,
    );
    const modeConfig = modeService.getModeConfiguration();
    switch (modeConfig.mode) {
      case ModeDTO.Direct: {
        const client = context.container.get<IBaseLineClient>(TYPES.BaseLineClient);
        return new DirectScoutService(client);
      }
      default: {
        const scoutGenerator = context.container.get<IRandomScoutGenerator>(
          TYPES.RandomScoutGenerator,
        );
        return new RandomScoutService(scoutGenerator);
      }
    }
  })
  .inRequestScope();

container
  .bind<IMatchService>(TYPES.MatchesService)
  .toDynamicValue((context) => {
    const modeService = context.container.get<IModeConfigurationService>(
      TYPES.ModeConfigurationService,
    );
    const modeConfig = modeService.getModeConfiguration();
    switch (modeConfig.mode) {
      case ModeDTO.Direct: {
        const client = context.container.get<IBaseLineClient>(TYPES.BaseLineClient);
        return new DirectMatchService(client);
      }
      default:
        const matchGenerator = context.container.get<IRandomMatchGenerator>(
          TYPES.RandomMatchGenerator,
        );
        return new RandomMatchService(matchGenerator);
    }
  })
  .inRequestScope();

export { container };
