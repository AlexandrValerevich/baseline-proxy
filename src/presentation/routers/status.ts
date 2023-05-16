import { Router, type Request, type Response } from 'express'
import { TYPES, container } from '../../container/index.js'
import { type IModeConfigurationService } from '../../application/index.js'

const statusRouter = Router()

statusRouter
  .get('/api/status', (req: Request, res: Response<{ status }>) => {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService)
    const { status } = modeService.getSubstitutionMessage()
    return res.json({ status })
  })
  .put(
    '/api/status',
    (req: Request<Record<string, unknown>, Record<string, unknown>, { status: number }>, res: Response) => {
      const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService)
      modeService.setStatusSubstitutionMessage(req.body.status)
      return res.status(204).send()
    }
  )

export { statusRouter }
