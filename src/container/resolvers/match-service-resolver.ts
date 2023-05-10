import { interfaces } from "inversify";
import {
  DirectMatchService,
  IBaseLineClient,
  IMatchService,
  IModeConfigurationService,
  IRandomMatchGenerator,
  IScoutService,
  MatchDTO,
  MatchServiceLoggerDecorator,
  ModeDTO,
  RandomMatchService,
} from "../../application/index.js";
import { TYPES } from "../types.js";

const matchServiceResolver = (context: interfaces.Context): IMatchService => {
  const modeService = context.container.get<IModeConfigurationService>(
    TYPES.ModeConfigurationService,
  );
  const mode = modeService.getMode();
  let matchService: IMatchService;
  switch (mode) {
    case ModeDTO.Direct:
      matchService = new DirectMatchService(
        context.container.get<IBaseLineClient>(TYPES.BaseLineClient),
      );
      break;
    case ModeDTO.ErrorOnce:
      matchService = {
        getMatches: async (): Promise<MatchDTO[]> => {
          modeService.throwOnceError();
          return [];
        },
      };
      break;
    case ModeDTO.ErrorInfinity:
      matchService = {
        getMatches: async (): Promise<MatchDTO[]> => {
          modeService.throwInfinityError();
          return [];
        },
      };
      break;
    case ModeDTO.PredefinedResponses:
      matchService = {
        getMatches: async (): Promise<MatchDTO[]> => {
          return modeService.getPredefinedMatches();
        },
      };
      break;
    default:
      const matchGenerator = context.container.get<IRandomMatchGenerator>(
        TYPES.RandomMatchGenerator,
      );
      matchService = new RandomMatchService(matchGenerator);
  }
  return new MatchServiceLoggerDecorator(matchService);
};

export { matchServiceResolver };
