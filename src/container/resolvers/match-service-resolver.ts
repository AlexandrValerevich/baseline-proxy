import { interfaces } from "inversify";
import {
  DirectMatchService,
  IBaseLineClient,
  IMatchService,
  IModeConfigurationService,
  IRandomMatchGenerator,
  MatchDTO,
  ModeDTO,
  RandomMatchService,
} from "../../application/index.js";
import { TYPES } from "../types.js";

const matchServiceResolver = (context: interfaces.Context): IMatchService => {
  const modeService = context.container.get<IModeConfigurationService>(
    TYPES.ModeConfigurationService,
  );
  const mode = modeService.getMode();
  switch (mode) {
    case ModeDTO.Direct:
      return new DirectMatchService(context.container.get<IBaseLineClient>(TYPES.BaseLineClient));
    case ModeDTO.ErrorOnce:
      return {
        getMatches: async (): Promise<MatchDTO[]> => {
          modeService.throwOnceError();
          return [];
        },
      };
    case ModeDTO.ErrorInfinity:
      return {
        getMatches: async (): Promise<MatchDTO[]> => {
          modeService.throwInfinityError();
          return [];
        },
      };
    case ModeDTO.PredefinedResponses:
      return {
        getMatches: async (): Promise<MatchDTO[]> => {
          return modeService.getPredefinedMatches();
        },
      };
    default:
      const matchGenerator = context.container.get<IRandomMatchGenerator>(
        TYPES.RandomMatchGenerator,
      );
      return new RandomMatchService(matchGenerator);
  }
};

export { matchServiceResolver };
