import { Router, type Request, type Response } from 'express'
import { TYPES, container } from '../../container/index.js'
import { type IModeConfigurationService } from '../../application/index.js'

const delayRouter = Router()

delayRouter
  .get('/api/delay', (req: Request, res: Response<{ delay: number }>) => {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService)
    const delay = modeService.getDelay()
    return res.json({ delay })
  })
  .put(
    '/api/delay',
    (req: Request<Record<string, unknown>, Record<string, unknown>, { delay }>, res: Response) => {
      const { delay } = req.body
      const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService)
      modeService.setDelay(delay)
      return res.status(204).send()
    }
  )

export { delayRouter }
