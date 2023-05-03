import { Container } from "inversify";
import { RandomScoutService } from "./application/scouts/RandomScoutService.js";
import { IScoutService } from "./application/scouts/IScoutService.js";
import { ModeConfigurationService } from "./application/mode/ModeConfigurationService.js";
import { IModeConfigurationService } from "./application/mode/IModeConfigurationService.js";
import { BaseLineClient } from "./application/baseline/BaseLineClient.js";
import { ModeDTO } from "./application/mode/dto/ModeDTO.js";
import { DirectScoutService } from "./application/scouts/DirectScoutService.js";
import { TYPES } from "./types.js";
import dotenv from "dotenv";
import { GraphQLClient } from "graphql-request";
dotenv.config();

const container = new Container();

container
  .bind<IModeConfigurationService>(TYPES.ModeConfigurationService)
  .to(ModeConfigurationService)
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
      default:
        return new RandomScoutService();
    }
  })
  .inRequestScope();

export { container };
