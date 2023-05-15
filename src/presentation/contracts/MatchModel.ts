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
    total?: number;
    probability?: number;
  };
  awayTeam: {
    id: number;
    name: string;
    languageCode: string;
    total?: number;
    probability?: number;
  };
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
  betstop?: {
    type: BetStopTypeModel;
    value: BetStopStatusModel;
    updatedBy: string;
    updatedAt: string;
  }[];
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

export { MatchModel, BetStopStatusModel, BetStopTypeModel, MatchStatusModel, TimerStatusModel };
