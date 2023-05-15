import { type ModeDTO } from '../mode/dto/ModeDTO.js'
import { InternalError } from './InternalError.js'

class WrongConfigurationModeError extends InternalError {
  constructor (currentMode: ModeDTO, expectedMode: ModeDTO) {
    super(`Current mode is ${currentMode}, expected mode ${expectedMode}`)
  }

  detail?: string
  message: string
}

export { WrongConfigurationModeError }
