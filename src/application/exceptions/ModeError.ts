import { type ErrorDTO } from '../mode/index.js'
import { ApplicationError } from './ApplicationError.js'

class ModeError extends ApplicationError {
  constructor (error: ErrorDTO) {
    super(error.message)
    this.name = 'ModeError'
    this.extensions = error.extensions
  }

  extensions?: any
}

export { ModeError }
