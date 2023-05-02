import { Container } from "inversify";
import { IScoutService } from "../application/scouts/ScoutService";
import { IModeConfigurationService } from "../application/mode/ModeConfigurationService";

interface IValueContext {
  serviceProvider: Container;
  scoutService: IScoutService;
  modeConfigurationsService: IModeConfigurationService;
}

export { IValueContext };
