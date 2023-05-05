import { TeamModel } from "./TeamModel.js";
import { SportModel } from "./SportModel.js";
import { VenueModel } from "./VenueModel.js";
import { SeasonModel } from "./SeasonModel.js";
import { BetStopModel } from "./BetStopModel.js";
import { CountryModel } from "./CountryModel.js";
import { TournamentModel } from "./TournamentModel.js";
import { PeriodScoreModel } from "./PeriodScoreModel.js";
import { TimerStatusModel } from "./TimerStatusModel.js";
import { BetStopValueModel } from "./BetStopValueModel.js";
import { ShootoutScoresModel } from "./ShootoutScoresModel.js";
import { AssignedTraderModel } from "./AssignedTraderModel.js";
import { MatchStatusModel } from "./MatchStatusModel.js";

interface MatchModel {
  id: number;
  name: string;
  startedAt: string;
  status: MatchStatusModel;
  homeTeam: TeamModel;
  awayTeam: TeamModel;
  ingameTime: string;
  betstopStatus: BetStopValueModel;
  refundStatus: boolean;
  triggerId: string;
  options: {
    periods: number;
    periodTime: number;
  };
  homeScore: number;
  awayScore: number;
  periodScores: PeriodScoreModel[];
  period: number;
  aftermatchShootouts: boolean;
  shootoutsScores: ShootoutScoresModel;
  timer: number;
  timerStatus: TimerStatusModel;
  betstop: BetStopModel[];
  assignedTrader: AssignedTraderModel;
  leagueName: string;
  homeCorrection: number;
  awayCorrection: number;
  homeTotal: number;
  awayTotal: number;
  matchDelay: boolean;
  timestamp: number;
  season: SeasonModel;
  tournament: TournamentModel;
  sport: SportModel;
  country: CountryModel;
  venue: VenueModel;
}

export { MatchModel };
