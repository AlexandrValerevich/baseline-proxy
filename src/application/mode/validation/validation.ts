import Joi from 'joi'
import { type PredefinedResponsesDTO, type ErrorDTO, type ModeDTO, type ModeConfigurationDTO } from '../dto/index.js'
import { matchDTOValidator } from '../../matches/validation/index.js'
import { scoutDTOValidator } from '../../scouts/validation/index.js'
import { type SubstitutionDTO } from '../dto/SubstitutionDTO.js'

const errorDTOValidator = Joi.object<ErrorDTO>({
  message: Joi.string().required(),
  extensions: Joi.any().allow(null).optional()
})

const predefinedResponsesDTOValidator = Joi.object<PredefinedResponsesDTO>({
  scouts: Joi.array().items(scoutDTOValidator),
  matches: Joi.array().items(matchDTOValidator)
})

const modeDTOValidator = Joi.string<ModeDTO>().valid(
  'direct',
  'random',
  'predefined_response',
  'error_once',
  'error_infinity',
  'body_substitution'
)

const substitutionValidator = Joi.object<SubstitutionDTO>({
  body: Joi.string().allow('', null).optional(),
  status: Joi.number().integer().min(0).max(599).required()
})

const modeConfigurationDTOValidator = Joi.object<ModeConfigurationDTO>({
  mode: modeDTOValidator.required(),
  delay: Joi.number().min(0).required(),
  error: errorDTOValidator.required(),
  predefinedResponses: predefinedResponsesDTOValidator.required(),
  substitutionMessage: substitutionValidator.required()
})

export {
  substitutionValidator,
  errorDTOValidator,
  predefinedResponsesDTOValidator,
  modeDTOValidator,
  modeConfigurationDTOValidator
}
