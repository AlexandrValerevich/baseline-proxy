import { Router, type Request, type Response } from 'express'
import { TYPES, container } from '../../container/index.js'
import { type IModeConfigurationService } from '../../application/index.js'
import { type ModeConfigurationModel } from '../contracts/ModeConfigurationModel.js'

const configurationRouter = Router()

configurationRouter
  .get('/api/configuration', (req: Request, res: Response<ModeConfigurationModel>) => {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService)
    const configurationDto = modeService.getModeConfiguration()
    return res.json(configurationDto)
  })
  .put(
    '/api/configuration',
    (
      req: Request<Record<string, unknown>, Record<string, unknown>, ModeConfigurationModel>,
      res: Response
    ) => {
      const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService)
      modeService.setModeConfiguration(req.body)
      return res.status(204).send()
    }
  )

export { configurationRouter }
