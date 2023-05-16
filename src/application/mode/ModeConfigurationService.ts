import 'reflect-metadata'
import { injectable } from 'inversify'
import {
  errorDTOValidator,
  modeConfigurationDTOValidator,
  modeDTOValidator,
  substitutionValidator
} from './validation/index.js'
import { arrayScoutDTOValidator } from '../scouts/validation/index.js'
import { arrayMatchDtoValidator } from '../matches/validation/index.js'
import { ModeError, ValidationError, WrongConfigurationModeError } from '../exceptions/index.js'
import { type IModeConfigurationService } from './IModeConfigurationService.js'
import { type ErrorDTO, type ModeDTO, type ModeConfigurationDTO, type SubstitutionDTO } from './dto/index.js'
import { type MatchDTO } from '../matches/index.js'
import { type ScoutDTO } from '../scouts/index.js'
import { logger } from '../../logger/index.js'
import { detailsAsSting } from '../helpers/index.js'

@injectable()
class ModeConfigurationService implements IModeConfigurationService {
  private readonly configuration: ModeConfigurationDTO

  constructor () {
    this.configuration = {
      mode: 'direct',
      error: {
        message: 'Internal Error',

        extensions: {
          http: { status: 500 },
          code: 'CUSTOM_GENERATED_ERROR',
          details: 'Some error details',
          randomField: 'randomValue'
        }
      },
      predefinedResponses: { scouts: [], matches: [] },
      delay: 100,
      substitutionMessage: {
        body: '',
        status: 200
      }
    }
  }

  setDelay (delay: number): void {
    if (delay <= 0) {
      throw new ValidationError(`Provided delay value less than 0. Delay ${delay}`)
    }
    this.configuration.delay = delay
    this.logNewConfigurationValue()
  }

  setMode (mode: ModeDTO): void {
    const { value, error: validationError } = modeDTOValidator.validate(mode)
    if (validationError != null) {
      throw new ValidationError(validationError.message, detailsAsSting(validationError))
    }
    this.configuration.mode = value
    this.logNewConfigurationValue()
  }

  setSubstitutionMessage (substitution?: SubstitutionDTO): void {
    const { value, error } = substitutionValidator.validate(substitution)
    if (error != null) {
      throw new ValidationError(error.message, detailsAsSting(error))
    }

    this.configuration.substitutionMessage = value
    this.logNewConfigurationValue()
  }

  setError (error?: ErrorDTO | undefined): void {
    const { value, error: validationError } = errorDTOValidator.validate(error)
    if (validationError != null) {
      throw new ValidationError(validationError.message, detailsAsSting(validationError))
    }
    this.configuration.error = value
    this.logNewConfigurationValue()
  }

  setPredefinedScouts (scouts: ScoutDTO[]): void {
    const { value, error } = arrayScoutDTOValidator.validate(scouts)
    if (error != null) {
      throw new ValidationError(error.message, detailsAsSting(error))
    }
    this.configuration.predefinedResponses.scouts = value
    this.logNewConfigurationValue()
  }

  setPredefinedMatches (matches: MatchDTO[]): void {
    const { value, error } = arrayMatchDtoValidator.validate(matches)
    if (error != null) {
      throw new ValidationError(error.message, detailsAsSting(error))
    }
    this.configuration.predefinedResponses.matches = value
    this.logNewConfigurationValue()
  }

  setModeConfiguration (configuration: ModeConfigurationDTO): void {
    const { value, error } = modeConfigurationDTOValidator.validate(configuration)
    if (error != null) {
      throw new ValidationError(error.message, detailsAsSting(error))
    }
    this.configuration.mode = value.mode
    this.configuration.delay = value.delay
    this.configuration.error = value.error
    this.configuration.predefinedResponses = value.predefinedResponses
    this.configuration.substitutionMessage = value.substitutionMessage
  }

  getModeConfiguration (): ModeConfigurationDTO {
    return this.configuration
  }

  getDelay (): number {
    return this.configuration.delay
  }

  getMode (): ModeDTO {
    return this.configuration.mode
  }

  getPredefinedScouts (): ScoutDTO[] {
    return this.configuration.predefinedResponses.scouts
  }

  getPredefinedMatches (): MatchDTO[] {
    return this.configuration.predefinedResponses.matches
  }

  getSubstitutionMessage (): SubstitutionDTO {
    return this.configuration.substitutionMessage
  }

  getError (): ErrorDTO {
    return this.configuration.error
  }

  throwOnceError (): void {
    if (this.configuration.mode !== 'error_once') {
      throw new WrongConfigurationModeError(this.configuration.mode, 'error_once')
    }
    logger.debug('Throw once error and switch to direct mode.')
    this.configuration.mode = 'direct'
    throw new ModeError(this.configuration.error)
  }

  throwInfinityError (): void {
    if (this.configuration.mode !== 'error_infinity') {
      throw new WrongConfigurationModeError(this.configuration.mode, 'error_infinity')
    }
    logger.debug('Throw infinity error.')
    throw new ModeError(this.configuration.error)
  }

  private logNewConfigurationValue (): void {
    logger.debug({
      message: `New configuration value is set. Mode: ${this.configuration.mode}, Delay ${this.configuration.delay}`,
      configuration: this.configuration
    })
  }
}

export { type IModeConfigurationService, ModeConfigurationService }
