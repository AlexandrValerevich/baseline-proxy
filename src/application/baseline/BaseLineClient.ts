import "reflect-metadata";
import { inject, injectable } from "inversify";
import { GraphQLClient } from "graphql-request";
import { TYPES } from "../../container/types.js";
import {
  GetMatchesForPeriodRequestModel,
  GetScoutsFroPeriodRequestModel,
  MatchModel,
  ScoutModel,
} from "./models/index.js";
import { IBaseLineClient } from "./IBaseLineClient.js";

@injectable()
class BaseLineClient implements IBaseLineClient {
  private client: GraphQLClient;

  constructor(@inject(TYPES.GraphQlBaseLineClient) client: GraphQLClient) {
    this.client = client;
  }

  async getScoutsForPeriod(request: GetScoutsFroPeriodRequestModel): Promise<ScoutModel[]> {
    const query = `
      query GetScoutsForPeriod($dateFrom: DateTime!, $dateTo: DateTime!) {
        scouts: getMatchScoutEvents(timeFrom: $dateFrom, timeTo: $dateTo) {
            id
            team
            matchId
            eventName
            eventId
            minutes
            timeOfEvent
            stage
            eventTimestamp
            playerId
            player
            triggerId
            changeType
            timestamp
        }
    }
    `;

    const variables = {
      dateFrom: request.dateFrom.toISOString().slice(0, -5),
      dateTo: request.dateTo.toISOString().slice(0, -5),
    };
    const operationName = "GetScoutsForPeriod";

    const data = (await this.client.request(query, variables, { operationName })) as {
      scouts: ScoutModel[];
    };

    return data.scouts;
  }

  async getMatchesForPeriod(request: GetMatchesForPeriodRequestModel): Promise<MatchModel[]> {
    const query = `
      query GetMatchesForPeriod($dateFrom: String!, $dateTo: String!) {
        matches(dateFrom: $dateFrom, dateTo: $dateTo) {
          id
          name
          startedAt
          status
          homeTeam {
            id
            name
            languageCode
          }
          awayTeam {
            id
            name
            languageCode
          }
          ingameTime
          betstopStatus
          refundStatus
          triggerId
          options {
            periodTime
            periods
          }
          homeScore
          awayScore
          periodScores {
            period
            homeScore
            awayScore
          }
          period
          aftermatchShootouts
          shootoutsScores {
            homeScores
            awayScores
          }
          timer
          timerStatus
          betstop {
            type
            value
            updatedBy
            updatedAt
          }
          assignedTrader {
            id
            name
            email
          }
          leagueName
          homeCorrection
          awayCorrection
          homeTotal
          awayTotal
          matchDelay
          timestamp
          season {
            id
            name
            languageCode
            endDate
            startDate
          }
          tournament {
            id
            name
            languageCode
          }
          sport {
            id
            name
            languageCode
          }
          venue {
            id
            name
            languageCode
          }
          country {
            id
            name
            languageCode
          }
        }
      }
    `;

    const operationName = "GetMatchesForPeriod";
    const variables = {
      dateFrom: request.dateFrom,
      dateTo: request.dateTo,
    };

    const data = (await this.client.request(query, variables, { operationName })) as {
      matches: MatchModel[];
    };

    return data.matches;
  }
}

export { BaseLineClient };
