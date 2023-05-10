import { MatchDTO } from "../../matches/dto/MatchDTO.js";
import { ScoutDTO } from "../../scouts/dto/index.js";

interface PredefinedResponsesDTO {
  scouts: ScoutDTO[];
  matches: MatchDTO[];
}

export { PredefinedResponsesDTO };
