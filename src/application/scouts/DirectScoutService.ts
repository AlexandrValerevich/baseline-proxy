import { TYPES } from '../../container/types.js'
import { IBaseLineClient } from '../baseline/index.js'
import { inject, injectable } from 'inversify'
import { ValidationError } from '../exceptions/index.js'
import { type IScoutService } from './IScoutService.js'
import { type GetScoutsForPeriodQuery, type ScoutDTO } from './dto/index.js'
import { getScoutsForPeriodQueryValidator } from './validation/index.js'
import { detailsAsSting } from '../helpers/index.js'
import { faker } from '@faker-js/faker'

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

    return response.map((s) => {
      let changeType: 'added' | 'removed' | 'restored';
      switch(s.changeType) {
        case "ADDED": 
          changeType = 'added'
          break;
        case "REMOVED" :
          changeType = 'removed'
          break;
        default: {
          changeType = 'restored'
        }
      }
      
      return {
        id: s.id,
        eventId: s.eventId,
        matchId: s.matchId,
        ingameTime: s.minutes,
        owner: faker.helpers.arrayElement(['game', 'home', 'away']), // Does not implemented in old BL API
        dateTime: new Date(s.timestamp * 1000),
        changeType // In old BL implementation there no RESTORED
      };
    })
  }
}

export { DirectScoutService }
