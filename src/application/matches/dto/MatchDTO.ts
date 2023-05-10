import { TeamDTO } from "./TeamDTO.js";
import { SportDTO } from "./SportDTO.js";
import { VenueDTO } from "./VenueDTO.js";
import { SeasonDTO } from "./SeasonDTO.js";
import { BetStopDTO } from "./BetStopDTO.js";
import { CountryDTO } from "./CountryDTO.js";
import { TournamentDTO } from "./TournamentDTO.js";
import { MatchStatusDTO } from "./MatchStatusDTO.js";
import { PeriodScoreDTO } from "./PeriodScoreDTO.js";
import { TimerStatusDTO } from "./TimerStatusDTO.js";
import { BetStopValueDTO } from "./BetStopValueDTO.js";
import { ShootoutScoresDTO } from "./ShootoutScoresDTO.js";
import { AssignedTraderDTO } from "./AssignedTraderDTO.js";

interface MatchDTO {
  id: number;
  name: string;
  startedAt: string;
  status: MatchStatusDTO;
  homeTeam: TeamDTO;
  awayTeam: TeamDTO;
  ingameTime?: string;
  betstopStatus?: BetStopValueDTO;
  refundStatus?: boolean;
  triggerId?: string;
  options?: {
    periods: number;
    periodTime: number;
  };
  homeScore?: number;
  awayScore?: number;
  periodScores?: PeriodScoreDTO[];
  period?: number;
  aftermatchShootouts?: boolean;
  shootoutsScores?: ShootoutScoresDTO;
  timer?: number;
  timerStatus?: TimerStatusDTO;
  betstop?: BetStopDTO[];
  assignedTrader?: AssignedTraderDTO;
  leagueName?: string;
  homeCorrection?: number;
  awayCorrection?: number;
  homeTotal?: number;
  awayTotal?: number;
  matchDelay?: boolean;
  timestamp?: number;
  season?: SeasonDTO;
  tournament?: TournamentDTO;
  sport?: SportDTO;
  country?: CountryDTO;
  venue?: VenueDTO;
}

export { MatchDTO };
