import { Router, type Request, type Response } from 'express'
import { TYPES, container } from '../../container/index.js'
import { type IModeConfigurationService } from '../../application/index.js'
import { type ErrorModel } from '../contracts/index.js'

const errorRouter = Router()

errorRouter
  .get('/api/error', (req: Request, res: Response<ErrorModel>) => {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService)
    const errorDto = modeService.getError()
    return res.json(errorDto)
  })
  .put(
    '/api/error',
    (req: Request<Record<string, unknown>, Record<string, unknown>, ErrorModel>, res: Response) => {
      const error = req.body
      const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService)
      modeService.setError(error)
      return res.status(204).send()
    }
  )

export { errorRouter }
