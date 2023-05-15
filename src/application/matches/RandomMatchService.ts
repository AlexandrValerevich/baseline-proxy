import { inject } from 'inversify'
import { TYPES } from '../../container/types.js'
import { ValidationError } from '../exceptions/index.js'
import { type IMatchService } from './IMatchService.js'
import { IRandomMatchGenerator } from './generator/index.js'
import { type GetMatchesForPeriodQuery, type MatchDTO } from './dto/index.js'
import { getMatchesForPeriodQueryValidator } from './validation/index.js'
import { detailsAsSting } from '../helpers/index.js'

class RandomMatchService implements IMatchService {
  private readonly matchGenerator: IRandomMatchGenerator

  constructor (@inject(TYPES.RandomMatchGenerator) matchGenerator: IRandomMatchGenerator) {
    this.matchGenerator = matchGenerator
  }

  async getMatches (query: GetMatchesForPeriodQuery): Promise<MatchDTO[]> {
    const { error } = getMatchesForPeriodQueryValidator.validate(query)
    if (error != null) {
      throw new ValidationError(error.message, detailsAsSting(error))
    }

    const matchesDto = this.matchGenerator.generateArray(5)
    return matchesDto
  }
}

export { RandomMatchService }
