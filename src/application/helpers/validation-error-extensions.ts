import { type ValidationError } from 'joi'

const detailsAsSting = (error: ValidationError): string => {
  return error.details.map((x) => x.message).join('.')
}

export { detailsAsSting }
