import { Container } from "inversify";
import {
  IScoutService,
  ScoutService,
} from "./application/scouts/ScoutService.js";
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
  .to(ScoutService)
  .inRequestScope();

container
  .bind<IModeConfigurationService>(TYPES.ModeConfigurationService)
  .to(ModeConfigurationService)
  .inSingletonScope();

export { container, TYPES };
