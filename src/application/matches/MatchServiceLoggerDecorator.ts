import { inject, injectable } from 'inversify'
import { TYPES } from '../../container/types.js'
import { IMatchService } from './IMatchService.js'
import { type GetMatchesForPeriodQuery, type MatchDTO } from './dto/index.js'
import { logger } from '../../logger/index.js'
import { timeDiff } from '../helpers/index.js'

@injectable()
class MatchServiceLoggerDecorator implements IMatchService {
  private readonly matchService: IMatchService

  constructor (@inject(TYPES.MatchesService) matchService: IMatchService) {
    this.matchService = matchService
  }

  async getMatches (query: GetMatchesForPeriodQuery): Promise<MatchDTO[]> {
    const start = performance.now()
    const { dateFrom, dateTo } = {
      dateFrom: query.dateFrom.toISOString(),
      dateTo: query.dateTo.toISOString()
    }
    const diff = timeDiff(query.dateFrom, query.dateTo)

    try {
      const matches = await this.matchService.getMatches(query)
      const elapsed = (performance.now() - start).toFixed(2)
      logger.info({
        message: `Getting matches on period from ${dateFrom} to ${dateTo} is competed successfully in ${elapsed} ms`,
        timeDiff: diff,
        query,
        matches
      })

      return matches
    } catch (error) {
      const elapsed = (performance.now() - start).toFixed(2)
      logger.error({
        message: `Getting matches on period from ${dateFrom} to ${dateTo} has failed in ${elapsed} ms`,
        timeDiff: diff,
        error,
        query
      })
      throw error
    }
  }
}

export { MatchServiceLoggerDecorator }
