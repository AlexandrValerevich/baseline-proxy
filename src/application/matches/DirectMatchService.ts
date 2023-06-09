import { TYPES } from '../../container/types.js'
import { IBaseLineClient, type MatchModel } from '../baseline/index.js'
import { inject, injectable } from 'inversify'
import { type IMatchService } from './IMatchService.js'
import { getMatchesForPeriodQueryValidator } from './validation/index.js'
import { type MatchDTO, type GetMatchesForPeriodQuery } from './dto/index.js'
import { faker } from '@faker-js/faker'
import { ValidationError } from '../exceptions/index.js'
import { detailsAsSting } from '../helpers/index.js'

@injectable()
class DirectMatchService implements IMatchService {
  private readonly client: IBaseLineClient

  constructor(@inject(TYPES.BaseLineClient) client: IBaseLineClient) {
    this.client = client
  }

  async getMatches(query: GetMatchesForPeriodQuery): Promise<MatchDTO[]> {
    const { error } = getMatchesForPeriodQueryValidator.validate(query)
    if (error != null) {
      throw new ValidationError(error.message, detailsAsSting(error))
    }

    const response = await this.client.getMatchesForPeriod({
      dateFrom: query.dateFrom.toISOString().slice(0, -5),
      dateTo: query.dateTo.toISOString().slice(0, -5)
    })

    return this.map(response)
  }

  private map(matches: MatchModel[]): MatchDTO[] {
    return matches.map((m) => ({
      ...m,
      status: faker.helpers.arrayElement([
        'planned',
        'live',
        'done',
        'canceled',
        'delayed',
        'new_value'
      ]),
      dateTime: new Date(m.timestamp * 1000),
      betStatus: m.betstop?.find((x) => x.value === 'stop') === null,
      shootoutsScores:
        m.shootoutsScores != null && m.periodScores != null
          ? Array.from({ length: faker.datatype.number({ min: 0, max: 10 }) }, (_, i) => ({
              number: i + 1,
              owner: i % 2 === 1 ? 'home' : 'away',
              isScored: faker.datatype.boolean()
            }))
          : undefined,
      awayTeam: {
        id: m.awayTeam.id,
        names: [
          {
            name: m.awayTeam.name,
            languageCode: m.awayTeam.languageCode
          }
        ],
        total: m.awayTotal,
        probability: 0
      },
      homeTeam: {
        id: m.homeTeam.id,
        names: [
          {
            name: m.homeTeam.name,
            languageCode: m.homeTeam.languageCode
          }
        ],
        total: m.homeTotal,
        probability: 1
      },
      season: {
        id: m.season.id,
        endDate: m.season.endDate,
        startDate: m.season.startDate,
        names: [
          {
            name: m.season.name,
            languageCode: m.season.languageCode
          }
        ]
      },
      tournament: {
        id: m.tournament.id,
        names: [
          {
            name: m.tournament.name,
            languageCode: m.tournament.languageCode
          }
        ]
      },
      sport: {
        id: m.sport.id,
        names: [
          {
            name: m.sport.name,
            languageCode: m.sport.languageCode
          }
        ]
      },
      country: {
        id: m.country.id,
        names: [
          {
            name: m.country.name,
            languageCode: m.country.languageCode
          }
        ]
      },
      venue: {
        id: m.venue.id,
        names: [
          {
            name: m.venue.name,
            languageCode: m.venue.languageCode
          }
        ]
      }
    }))
  }
}

export { DirectMatchService }
