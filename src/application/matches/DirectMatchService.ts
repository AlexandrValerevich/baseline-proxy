import { TYPES } from "../../container/types.js";
import { IBaseLineClient, MatchModel } from "../baseline/index.js";
import { inject, injectable } from "inversify";
import { ValidationError } from "../exceptions/index.js";
import { IMatchService } from "./IMatchService.js";
import { getMatchesForPeriodQueryValidator } from "./validation/index.js";
import { MatchDTO, GetMatchesForPeriodQuery, BetStopDTO, BetStopStatusDTO } from "./dto/index.js";
import {
  betStopTypeMapper,
  betStopValueMapper,
  matchStatusMapper,
  timerStatusMapper,
} from "./mapping/index.js";
import { logger } from "../../logger/logger.js";

@injectable()
class DirectMatchService implements IMatchService {
  private client: IBaseLineClient;

  constructor(@inject(TYPES.BaseLineClient) client: IBaseLineClient) {
    this.client = client;
  }

  async getMatches(query: GetMatchesForPeriodQuery): Promise<MatchDTO[]> {
    try {
      const { error } = getMatchesForPeriodQueryValidator.validate(query);
      if (error) {
        throw new ValidationError(error.message, error.detailsAsSting());
      }

      const response = await this.client.getMatchesForPeriod({
        dateFrom: query.timeFrom,
        dateTo: query.timeTo,
      });

      const matchesDto = this.map(response);

      logger.debug({
        message: `Direct matches resolving is completed successfully.`,
        query,
        matchesDto,
      });

      return matchesDto;
    } catch (error) {
      logger.error({
        message: `Direct matches resolving failed.`,
        query,
        error,
      });
      throw error;
    }
  }

  private map(matches: MatchModel[]): MatchDTO[] {
    return matches.map(
      (x): MatchDTO => ({
        id: x.id,
        name: x.name,
        startedAt: x.startedAt,
        status: matchStatusMapper(x.status),
        homeTeam: x.homeTeam,
        awayTeam: x.awayTeam,
        ingameTime: x.ingameTime,
        betstopStatus: betStopValueMapper(x.betstopStatus),
        refundStatus: x.refundStatus,
        triggerId: x.triggerId,
        options: x.options,
        homeScore: x.homeScore,
        awayScore: x.awayScore,
        periodScores: x.periodScores,
        period: x.period,
        aftermatchShootouts: x.aftermatchShootouts,
        shootoutsScores: x.shootoutsScores,
        timer: x.timer,
        timerStatus: timerStatusMapper(x.timerStatus),
        betstop: x.betstop.map(
          (betstop): BetStopDTO => ({
            updatedAt: betstop.updatedAt,
            updatedBy: betstop.updatedBy,
            type: betStopTypeMapper(betstop.type),
            value: BetStopStatusDTO.Ok,
          }),
        ),
        assignedTrader: x.assignedTrader,
        leagueName: x.leagueName,
        homeCorrection: x.homeCorrection,
        awayCorrection: x.awayCorrection,
        homeTotal: x.homeTotal,
        awayTotal: x.awayTotal,
        matchDelay: x.matchDelay,
        timestamp: x.timestamp,
        season: x.season,
        tournament: x.tournament,
        sport: x.sport,
        country: x.country,
        venue: x.venue,
      }),
    );
  }
}

export { DirectMatchService };
