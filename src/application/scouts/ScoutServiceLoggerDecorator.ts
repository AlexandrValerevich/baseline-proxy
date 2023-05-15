import { inject, injectable } from 'inversify'
import { TYPES } from '../../container/types.js'
import { type GetScoutsForPeriodQuery, type ScoutDTO } from './dto/index.js'
import { logger } from '../../logger/index.js'
import { IScoutService } from './IScoutService.js'
import { timeDiff } from '../helpers/index.js'

@injectable()
class ScoutServiceLoggerDecorator implements IScoutService {
  private readonly scoutService: IScoutService

  constructor (@inject(TYPES.ScoutsService) scoutService: IScoutService) {
    this.scoutService = scoutService
  }

  async getScouts (query: GetScoutsForPeriodQuery): Promise<ScoutDTO[]> {
    const start = performance.now()
    const { dateFrom, dateTo } = {
      dateFrom: query.dateFrom.toISOString(),
      dateTo: query.dateTo.toISOString()
    }
    const diff = timeDiff(query.dateFrom, query.dateTo)
    try {
      const scouts = await this.scoutService.getScouts(query)
      const elapsed = (performance.now() - start).toFixed(2)

      logger.info({
        message: `Getting scouts on period from ${dateFrom} to ${dateTo} is competed successfully in ${elapsed} ms`,
        timeDiff: diff,
        query,
        scouts
      })

      return scouts
    } catch (error) {
      const elapsed = (performance.now() - start).toFixed(2)
      logger.error({
        message: `Getting scouts on period from ${dateFrom} to ${dateTo} has failed in ${elapsed} ms`,
        timeDiff: diff,
        error,
        query
      })
      throw error
    }
  }
}

export { ScoutServiceLoggerDecorator }
