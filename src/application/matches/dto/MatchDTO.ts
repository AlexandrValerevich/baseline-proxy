import { TeamDTO } from "./TeamDTO.js";
import { SportDTO } from "./SportDTO.js";
import { VenueDTO } from "./VenueDTO.js";
import { SeasonDTO } from "./SeasonDTO.js";
import { BetStopDTO } from "./BetStopDTO.js";
import { CountryDTO } from "./CountryDTO.js";
import { TournamentDTO } from "./TournamentDTO.js";
import { PeriodScoreDTO } from "./PeriodScoreDTO.js";
import { ShootoutScoresDTO } from "./ShootoutScoresDTO.js";

type MatchStatusDTO = "planned" | "prematch" | "live" | "done" | "forecast_missed";
type TimerStatusDTO = "stopped" | "running";

interface MatchDTO {
  id: number;
  name: string;
  period?: number;
  status: MatchStatusDTO;
  timestamp?: number;
  startedAt: string;
  aftermatchShootouts?: boolean;
  shootoutsScores?: ShootoutScoresDTO;
  homeTeam: TeamDTO;
  awayTeam: TeamDTO;
  betstop?: BetStopDTO[];
  periodScores?: PeriodScoreDTO[];
  season?: SeasonDTO;
  tournament?: TournamentDTO;
  sport?: SportDTO;
  country?: CountryDTO;
  venue?: VenueDTO;
}

export { MatchDTO, MatchStatusDTO, TimerStatusDTO };
