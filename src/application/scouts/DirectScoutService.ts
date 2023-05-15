import { TYPES } from '../../container/types.js'
import { IBaseLineClient } from '../baseline/index.js'
import { inject, injectable } from 'inversify'
import { ValidationError } from '../exceptions/index.js'
import { type IScoutService } from './IScoutService.js'
import { type GetScoutsForPeriodQuery, type ScoutDTO } from './dto/index.js'
import { getScoutsForPeriodQueryValidator } from './validation/index.js'
import { detailsAsSting } from '../helpers/index.js'

@injectable()
class DirectScoutService implements IScoutService {
  private readonly client: IBaseLineClient

  constructor (@inject(TYPES.BaseLineClient) client: IBaseLineClient) {
    this.client = client
  }

  async getScouts (query: GetScoutsForPeriodQuery): Promise<ScoutDTO[]> {
    const { error } = getScoutsForPeriodQueryValidator.validate(query)
    if (error != null) {
      throw new ValidationError(error.message, detailsAsSting(error))
    }

    const response = await this.client.getScoutsForPeriod({
      dateFrom: query.dateFrom,
      dateTo: query.dateTo
    })

    return response.map((s) => ({
      id: s.id,
      eventId: s.eventId,
      matchId: s.matchId,
      scoutTime: s.minutes,
      team: 1, // Does not implemented in old BL API
      timestamp: s.timestamp,
      changeType: s.changeType === 'SYSTEM' ? 'RESTORED' : s.changeType // In old BL implementation there no RESTORED
    }))
  }
}

export { DirectScoutService }
