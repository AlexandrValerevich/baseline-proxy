import { MatchDTO } from "../matches/index.js";
import { ScoutDTO } from "../scouts/index.js";
import { ModeConfigurationDTO } from "./dto/ModeConfigurationDTO.js";
import { ErrorDTO, ModeDTO } from "./dto/index.js";

export interface IModeConfigurationService {
  getMode(): ModeDTO;
  getError(): ErrorDTO;
  getDelay(): number;
  getPredefinedScouts(): ScoutDTO[];
  getPredefinedMatches(): MatchDTO[];
  getBodySubstitutionMessage(): string | undefined;
  getModeConfiguration(): ModeConfigurationDTO;

  setMode(mode: ModeDTO): void;
  setError(error?: ErrorDTO): void;
  setDelay(delay: number): void;
  setPredefinedScouts(scouts: ScoutDTO[]): void;
  setPredefinedMatches(matches: MatchDTO[]): void;
  setBodySubstitutionMessage(message?: string): void;
  setModeConfiguration(configuration: ModeConfigurationDTO): void;

  throwOnceError();
  throwInfinityError();
}
