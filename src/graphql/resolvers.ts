import { ModeDTO } from "../application/mode/dto/ModeDTO.js";
import { graphQlDateTime } from "./graphQlDateTime.js";

const queryResolver = {
  Query: {
    matches: () => [],
    getMatchScoutEvents: (_, { timeFrom, timeTo }, { scoutService }, __) => {
      console.info(
        `Start resolving getMatchScoutEvents(timeFrom: ${timeFrom}, timeTo: ${timeTo}).`
      );
      return scoutService.getScouts({
        timeFrom: timeFrom,
        timeTo: timeTo,
      });
    },
    getModeConfiguration: (_, __, { modeConfigurationsService }, ___) =>
      modeConfigurationsService.read(),
  },
};

const dateTimeResolver = {
  DateTime: graphQlDateTime,
};

const modeResolver = {
  Mode: {
    direct: ModeDTO.Direct,
    error_infinity: ModeDTO.ErrorInfinity,
    error_once: ModeDTO.ErrorInfinity,
    predefined_responses: ModeDTO.PredefinedResponses,
    random: ModeDTO.Random,
  },
};

const resolvers = [queryResolver, modeResolver, dateTimeResolver];

export { resolvers };
