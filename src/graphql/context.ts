import { Container } from "inversify";
import { IScoutService, IMatchService, IModeConfigurationService } from "../application";

interface IContext {
  serviceProvider: Container;
  scoutService: IScoutService;
  matchesService: IMatchService;
  modeConfigurationsService: IModeConfigurationService;
}

export { IContext };
