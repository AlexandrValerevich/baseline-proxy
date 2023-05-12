type BetStopValueModel = "ok" | "timeout" | "stop" | "ready_to_stop" | "ready_to_start";
type BetStopStatusModel = "ok" | "stop" | "ready_to_start";
type BetStopTypeModel = "scout" | "system" | "analyst";
type MatchStatusModel = "planned" | "prematch" | "live" | "done" | "forecast_missed";
type TimerStatusModel = "stopped" | "running";

interface MatchModel {
  id: number;
  name: string;
  startedAt: string;
  status: MatchStatusModel;
  homeTeam: {
    id: number;
    name: string;
    languageCode: string;
  };
  awayTeam: {
    id: number;
    name: string;
    languageCode: string;
  };
  ingameTime?: string;
  betstopStatus?: BetStopValueModel;
  refundStatus?: boolean;
  triggerId?: string;
  options?: {
    periods: number;
    periodTime: number;
  };
  homeScore?: number;
  awayScore?: number;
  periodScores?: {
    period: number;
    homeScore: number;
    awayScore: number;
  }[];
  period?: number;
  aftermatchShootouts?: boolean;
  shootoutsScores?: {
    homeScores: number[];
    awayScores: number[];
  };
  timer?: number;
  timerStatus?: TimerStatusModel;
  betstop?: {
    type: BetStopTypeModel;
    value: BetStopStatusModel;
    updatedBy: string;
    updatedAt: string;
  }[];
  assignedTrader?: {
    id: number;
    name: string;
    email: string;
  };
  leagueName?: string;
  homeCorrection?: number;
  awayCorrection?: number;
  homeTotal?: number;
  awayTotal?: number;
  matchDelay?: boolean;
  timestamp?: number;
  season?: {
    id: number;
    name: string;
    languageCode: string;
    startDate: string;
    endDate: string;
  };
  tournament?: {
    id: number;
    name: string;
    languageCode: string;
  };
  sport?: {
    id: number;
    name: string;
    languageCode: string;
  };
  country?: {
    id: number;
    name: string;
    languageCode: string;
  };
  venue?: {
    id: number;
    name: string;
    languageCode: string;
  };
}

export {
  MatchModel,
  BetStopValueModel,
  BetStopStatusModel,
  BetStopTypeModel,
  MatchStatusModel,
  TimerStatusModel,
};
