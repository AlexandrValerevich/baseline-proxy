import { TYPES } from '../../container/types.js'
import { IBaseLineClient, type MatchModel } from '../baseline/index.js'
import { inject, injectable } from 'inversify'
import { ValidationError } from '../exceptions/index.js'
import { type IMatchService } from './IMatchService.js'
import { getMatchesForPeriodQueryValidator } from './validation/index.js'
import { type MatchDTO, type GetMatchesForPeriodQuery } from './dto/index.js'
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

    return response
  }

  private map (matches: MatchModel[]): MatchDTO[] {
    return matches.map((m) => ({
      ...m,
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
