import {
  BetStopStatusModel,
  BetStopTypeModel,
  BetStopValueModel,
  MatchStatusModel,
  TimerStatusModel,
} from "../../baseline/index.js";
import { InternalError } from "../../exceptions/index.js";
import {
  BetStopStatusDTO,
  BetStopTypeDTO,
  BetStopValueDTO,
  MatchStatusDTO,
  TimerStatusDTO,
} from "../dto/index.js";

const matchStatusMapper = (matchStatus: MatchStatusModel): MatchStatusDTO => {
  switch (matchStatus) {
    case "planned":
      return MatchStatusDTO.Planned;
    case "prematch":
      return MatchStatusDTO.Prematch;
    case "live":
      return MatchStatusDTO.Live;
    case "done":
      return MatchStatusDTO.Done;
    case "forecast_missed":
      return MatchStatusDTO.ForecastMissed;
    default:
      throw new InternalError(`Unknown MatchStatusModel value: ${matchStatus}`);
  }
};

const betStopValueMapper = (betStopValue: BetStopValueModel): BetStopValueDTO | undefined => {
  switch (betStopValue) {
    case "ok":
      return BetStopValueDTO.Ok;
    case "stop":
      return BetStopValueDTO.Stop;
    case "read_to_start":
      return BetStopValueDTO.ReadToStart;
    case "read_to_stop":
      return BetStopValueDTO.ReadToStop;
    case "timeout":
      return BetStopValueDTO.Timeout;
    case undefined:
    case null:
      return;
    default:
      throw new InternalError(`Unknown BetStopValueModel value: ${betStopValue}`);
  }
};

const timerStatusMapper = (timerStatus: TimerStatusModel): TimerStatusDTO | undefined => {
  switch (timerStatus) {
    case "running":
      return TimerStatusDTO.Running;
    case "stopped":
      return TimerStatusDTO.Stopped;
    case undefined:
    case null:
      return;
    default:
      throw new InternalError(`Unknown TimerStatusModel value: ${timerStatus}`);
  }
};

const betStopTypeMapper = (betStopType: BetStopTypeModel): BetStopTypeDTO => {
  switch (betStopType) {
    case "analyst":
      return BetStopTypeDTO.Analyst;
    case "scout":
      return BetStopTypeDTO.Scout;
    case "system":
      return BetStopTypeDTO.System;
    default:
      throw new InternalError(`Unknown BetStopTypeModel value: ${betStopType}`);
  }
};

const betStopStatusMapper = (betStopStatus: BetStopStatusModel): BetStopStatusDTO => {
  switch (betStopStatus) {
    case "ok":
      return BetStopStatusDTO.Ok;
    case "read_to_start":
      return BetStopStatusDTO.ReadToStart;
    case "stop":
      return BetStopStatusDTO.Stop;
    default:
      throw new InternalError(`Unknown BetStopStatusModel value: ${betStopStatus}`);
  }
};

export {
  matchStatusMapper,
  betStopValueMapper,
  timerStatusMapper,
  betStopTypeMapper,
  betStopStatusMapper,
};
