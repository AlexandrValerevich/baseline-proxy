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
} from "../../application/index.js";
import { TYPES } from "../types.js";

const scoutServiceResolver = (context: interfaces.Context): IScoutService => {
  const modeService = context.container.get<IModeConfigurationService>(
    TYPES.ModeConfigurationService,
  );
  const mode = modeService.getMode();

  switch (mode) {
    case ModeDTO.Direct: {
      const client = context.container.get<IBaseLineClient>(TYPES.BaseLineClient);
      return new DirectScoutService(client);
    }
    case ModeDTO.ErrorOnce:
      return {
        getScouts: async (): Promise<ScoutDTO[]> => {
          modeService.throwOnceError();
          return [];
        },
      };
    case ModeDTO.ErrorInfinity:
      return {
        getScouts: async (): Promise<ScoutDTO[]> => {
          modeService.throwInfinityError();
          return [];
        },
      };
    case ModeDTO.PredefinedResponses:
      return {
        getScouts: async (): Promise<ScoutDTO[]> => {
          return modeService.getPredefinedScouts();
        },
      };
    default: {
      type NewType = IRandomScoutGenerator;

      const scoutGenerator = context.container.get<NewType>(TYPES.RandomScoutGenerator);
      return new RandomScoutService(scoutGenerator);
    }
  }
};

export { scoutServiceResolver };
