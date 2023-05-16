import { Router, type Request, type Response } from 'express'
import { TYPES, container } from '../../container/index.js'
import { type IModeConfigurationService } from '../../application/index.js'
import { type SubstitutionModel } from '../contracts/index.js'

const substitutionRouter = Router()

substitutionRouter
  .get('/api/substitution', (req: Request, res: Response<SubstitutionModel>) => {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService)
    const body = modeService.getSubstitutionMessage()
    return res.send(body)
  })
  .put(
    '/api/substitution',
    (req: Request<Record<string, unknown>, Record<string, unknown>, SubstitutionModel>, res: Response) => {
      const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService)
      modeService.setSubstitutionMessage(req.body)
      return res.status(204).send()
    }
  )

export { substitutionRouter }
