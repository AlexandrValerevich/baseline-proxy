import { MatchDTO } from "../matches/index.js";
import { ScoutDTO } from "../scouts/index.js";
import { ModeConfigurationDTO } from "./dto/ModeConfigurationDTO.js";
import { ErrorDTO, ModeDTO } from "./dto/index.js";

export interface IModeConfigurationService {
  getModeConfiguration(): ModeConfigurationDTO;
  getPredefinedScouts(): ScoutDTO[];
  getPredefinedMatches(): MatchDTO[];
  getMode(): ModeDTO;
  getDelay(): number;

  onDirectMode(): ModeConfigurationDTO;
  onRandomMode(): ModeConfigurationDTO;
  onErrorOnceMode(): ModeConfigurationDTO;
  onErrorInfinityMode(): ModeConfigurationDTO;
  onPredefinedResponseMode(): ModeConfigurationDTO;

  setError(error?: ErrorDTO): ModeConfigurationDTO;
  setDelay(delay: number): ModeConfigurationDTO;
  setPredefinedScouts(scouts: ScoutDTO[]): ModeConfigurationDTO;
  setPredefinedMatches(matches: MatchDTO[]): ModeConfigurationDTO;

  throwOnceError();
  throwInfinityError();
}
