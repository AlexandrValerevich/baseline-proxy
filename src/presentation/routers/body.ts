import { Router, type Request, type Response } from 'express'
import { TYPES, container } from '../../container/index.js'
import { type IModeConfigurationService } from '../../application/index.js'

const bodyRouter = Router()

bodyRouter
  .get('/api/body', (req: Request, res: Response<string>) => {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService)
    const { body } = modeService.getSubstitutionMessage()
    return res.send(body)
  })
  .put(
    '/api/body',
    (req: Request<Record<string, unknown>, Record<string, unknown>, string>, res: Response) => {
      const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService)
      modeService.setBodySubstitutionMessage(req.body)
      return res.status(204).send()
    }
  )

export { bodyRouter }
