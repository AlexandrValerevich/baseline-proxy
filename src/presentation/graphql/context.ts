import { Container } from "inversify";
import {
  IScoutService,
  IMatchService,
  IModeConfigurationService,
} from "../../application/index.js";
import { BaseContext } from "@apollo/server";

interface IContext extends BaseContext {
  serviceProvider: Container;
  scoutService: IScoutService;
  matchesService: IMatchService;
  modeConfigurationsService: IModeConfigurationService;
}

export { IContext };
