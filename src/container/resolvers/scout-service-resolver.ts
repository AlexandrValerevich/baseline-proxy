import { interfaces } from "inversify";
import {
  DirectScoutService,
  IBaseLineClient,
  IModeConfigurationService,
  IRandomScoutGenerator,
  IScoutService,
  ModeDTO,
  RandomScoutService,
  ScoutDTO,
  ScoutServiceLoggerDecorator,
} from "../../application/index.js";
import { TYPES } from "../types.js";

const scoutServiceResolver = (context: interfaces.Context): IScoutService => {
  const modeService = context.container.get<IModeConfigurationService>(
    TYPES.ModeConfigurationService,
  );
  const mode = modeService.getMode();
  let scoutService: IScoutService;
  switch (mode) {
    case ModeDTO.Direct: {
      const client = context.container.get<IBaseLineClient>(TYPES.BaseLineClient);
      scoutService = new DirectScoutService(client);
      break;
    }
    case ModeDTO.ErrorOnce:
      scoutService = {
        getScouts: async (): Promise<ScoutDTO[]> => {
          modeService.throwOnceError();
          return [];
        },
      };
      break;
    case ModeDTO.ErrorInfinity:
      scoutService = {
        getScouts: async (): Promise<ScoutDTO[]> => {
          modeService.throwInfinityError();
          return [];
        },
      };
      break;
    case ModeDTO.PredefinedResponses:
      scoutService = {
        getScouts: async (): Promise<ScoutDTO[]> => {
          return modeService.getPredefinedScouts();
        },
      };
      break;
    default: {
      type NewType = IRandomScoutGenerator;

      const scoutGenerator = context.container.get<NewType>(TYPES.RandomScoutGenerator);
      scoutService = new RandomScoutService(scoutGenerator);
    }
  }

  return new ScoutServiceLoggerDecorator(scoutService);
};

export { scoutServiceResolver };
