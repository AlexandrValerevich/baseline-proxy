import { Container } from "inversify";
import { RandomScoutService } from "./application/scouts/RandomScoutService.js";
import { IScoutService } from "./application/scouts/IScoutService.js";
import {
  IModeConfigurationService,
  ModeConfigurationService,
} from "./application/mode/ModeConfigurationService.js";

const container = new Container();

const TYPES = {
  ScoutsService: Symbol("IScoutsService"),
  ModeConfigurationService: Symbol("IModeConfigurationService"),
};

container
  .bind<IScoutService>(TYPES.ScoutsService)
  .toDynamicValue((context) => {
    // const modeService = context.container.get<IModeConfigurationService>(
    //   TYPES.ModeConfigurationService
    // );
    // const mode = modeService.read();
    return new RandomScoutService();
  })
  .inRequestScope();

container
  .bind<IModeConfigurationService>(TYPES.ModeConfigurationService)
  .to(ModeConfigurationService)
  .inSingletonScope();

export { container, TYPES };
