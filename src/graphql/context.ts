import { Container } from "inversify";
import { IScoutService } from "../application/scouts/IScoutService";
import { IModeConfigurationService } from "../application/mode/IModeConfigurationService";

interface IValueContext {
  serviceProvider: Container;
  scoutService: IScoutService;
  modeConfigurationsService: IModeConfigurationService;
}

export { IValueContext };
