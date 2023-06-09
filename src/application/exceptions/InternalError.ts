import { ApplicationError } from './ApplicationError.js'

class InternalError extends ApplicationError {
  constructor (message?: string, detail?: string) {
    super(message ?? 'Internal Error', detail)
    this.name = 'InternalError'
  }

  detail?: string
  message: string
}

export { InternalError }
