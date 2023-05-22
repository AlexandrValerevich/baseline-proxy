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

  constructor (@inject(TYPES.BaseLineClient) client: IBaseLineClient) {
    this.client = client
  }

  async getMatches (query: GetMatchesForPeriodQuery): Promise<MatchDTO[]> {
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

  private map (matches: MatchModel[]): MatchDTO[] {
    return matches.map((m) => ({
      ...m,
      betStatus: m.betstop?.find((x) => x.value === 'stop') === null,
      shootoutsScores:
        m.shootoutsScores != null && m.periodScores != null
          ? Array.from({ length: faker.datatype.number({ min: 0, max: 10 }) }, (_, i) => ({
            shootoutsNumber: i + 1,
            scoreTeam: i % 2 === 1 ? 1 : 2,
            scoreHome: i % 2 === 1 ? faker.helpers.arrayElement([0, 1]) : 0,
            scoreAway: i % 2 === 0 ? faker.helpers.arrayElement([0, 1]) : 0
          }))
          : undefined,
      awayTeam: {
        id: m.awayTeam.id,
        name: m.awayTeam.name,
        languageCode: m.awayTeam.languageCode,
        total: m.awayTotal,
        probability: 0
      },
      homeTeam: {
        id: m.homeTeam.id,
        name: m.homeTeam.name,
        languageCode: m.homeTeam.languageCode,
        total: m.homeTotal,
        probability: 1
      }
    }))
  }
}

export { DirectMatchService }
