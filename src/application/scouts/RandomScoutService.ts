import 'reflect-metadata'
import { TYPES } from '../../container/types.js'
import { inject, injectable } from 'inversify'
import { ValidationError } from '../exceptions/index.js'
import { type IScoutService } from './IScoutService.js'
import { IRandomScoutGenerator } from './generator/index.js'
import { type GetScoutsForPeriodQuery, type ScoutDTO } from './dto/index.js'
import { getScoutsForPeriodQueryValidator } from './validation/index.js'
import { logger } from '../../logger/logger.js'
import { detailsAsSting } from '../helpers/index.js'

@injectable()
class RandomScoutService implements IScoutService {
  private readonly scoutGenerator: IRandomScoutGenerator

  constructor (@inject(TYPES.RandomScoutGenerator) scoutGenerator: IRandomScoutGenerator) {
    this.scoutGenerator = scoutGenerator
  }

  async getScouts (query: GetScoutsForPeriodQuery): Promise<ScoutDTO[]> {
    const { error } = getScoutsForPeriodQueryValidator.validate(query)
    if (error != null) {
      throw new ValidationError(error.message, detailsAsSting(error))
    }

    const scoutsDto: ScoutDTO[] = this.scoutGenerator.generateArray(5)

    logger.debug({
      message: 'Random scouts resolving is completed successfully.',
      query,
      scoutsDto
    })

    return scoutsDto
  }
}

export { type IScoutService, RandomScoutService }
