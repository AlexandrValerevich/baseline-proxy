import { inject, injectable } from "inversify";
import { GraphQLClient } from "graphql-request";
import { TYPES } from "../../types.js";
import chalk from "chalk";

@injectable()
class BaseLineClient implements IBaseLineClient {
  private client: GraphQLClient;

  constructor(@inject(TYPES.GraphQlBaseLineClient) client: GraphQLClient) {
    this.client = client;
  }

  async getScoutsForPeriod(request: GetScoutFroPeriodRequestModel): Promise<ScoutModel[]> {
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

    try {
      const data = (await this.client.request(query, variables, { operationName })) as {
        scouts: ScoutModel[];
      };

      console.log(`
        ${chalk.blue("Send graphql request to BaseLine Api is completed successfully.")}
        ${chalk.green("Query:")} ${query},
        ${chalk.green("Variables:")} ${JSON.stringify(variables)},
        ${chalk.green("Operation Name:")} ${operationName},
        ${chalk.green("Response:")} ${JSON.stringify(data)}
    `);

      return data.scouts;
    } catch (ex) {
      console.error(`
        ${chalk.blue(`Send graphql request to BaseLine Api has failed. ${ex}`)}
        ${chalk.green("Query:")} ${query},
        ${chalk.green("Variables:")} ${JSON.stringify(variables)},
        ${chalk.green("Operation Name:")} ${operationName},
      `);
    }
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
    try {
      const data = (await this.client.request(query, variables, { operationName })) as {
        scouts: MatchModel[];
      };

      console.log(`
        ${chalk.blue("Send graphql request to BaseLine Api is completed successfully.")}
        ${chalk.green("Query:")} ${query},
        ${chalk.green("Variables:")} ${JSON.stringify(variables)},
        ${chalk.green("Operation Name:")} ${operationName},
        ${chalk.green("Response:")} ${JSON.stringify(data)}
    `);

      return data.scouts;
    } catch (ex) {
      console.error(`
        ${chalk.blue(`Send graphql request to BaseLine Api has failed. ${ex}`)}
        ${chalk.green("Query:")} ${query},
        ${chalk.green("Variables:")} ${JSON.stringify(variables)},
        ${chalk.green("Operation Name:")} ${operationName},
      `);
    }
  }
}

export { BaseLineClient };
