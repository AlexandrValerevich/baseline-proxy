import { Container } from "inversify";
import { IScoutService, IMatchService, IModeConfigurationService } from "../application";

interface IValueContext {
  serviceProvider: Container;
  scoutService: IScoutService;
  matchesService: IMatchService;
  modeConfigurationsService: IModeConfigurationService;
}

export { IValueContext };
