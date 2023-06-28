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
        names: {
          ru: m.awayTeam.name,
          en: m.awayTeam.name
        },
        total: m.awayTotal,
        probability: 0
      },
      homeTeam: {
        id: m.homeTeam.id,
        names: {
          ru: m.homeTeam.name,
          en: m.homeTeam.name
        },
        total: m.homeTotal,
        probability: 1
      },
      season: {
        id: m.season.id,
        endDate: m.season.endDate,
        startDate: m.season.startDate,
        names: {
          ru: m.season.name,
          en: m.season.languageCode
        }
      },
      tournament: {
        id: m.tournament.id,
        names: {
          ru: m.tournament.name,
          en: m.tournament.name
        }
      },
      sport: {
        id: m.sport.id,
        names: {
          ru: m.sport.name,
          en: m.sport.name
        }
      },
      country: {
        id: m.country.id,
        names: {
          ru: m.country.name,
          en: m.country.name
        }
      },
      venue: {
        id: m.venue.id,
        names: {
          ru: m.venue.name,
          en: m.venue.name
        }
      }
    }))
  }
}

export { DirectMatchService }
