import {
  type IModeConfigurationService,
  ModeError,
  ValidationError,
  WrongConfigurationModeError
} from '../../application/index.js'
import { TYPES, container } from '../../container/index.js'
import { type Request, type Response, type NextFunction } from 'express'
import { logger } from '../../logger/index.js'

const bodySubstitution = (
  req: Request<Record<string, unknown>, Record<string, unknown>, { query: string | undefined }>,
  res: Response,
  next: NextFunction
): void => {
  const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService)
  logger.debug(JSON.stringify(req.body))
  if (
    modeService.getMode() !== 'body_substitution' ||
    (req.body.query?.includes('query IntrospectionQuery') ?? false)
  ) {
    next()
    return
  }
  const substitution = modeService.getSubstitutionMessage()
  res.status(substitution?.status)
  res.type('json')
  res.send(substitution.body)
  logger.debug({ message: 'Current mode is body_substitution.', substitution })
}

const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  logger.debug({
    message: `HTTP Request ${req.method} ${req.originalUrl}`,
    headers: req.headers,
    request: req.body
  })

  const start = performance.now()
  res.on('close', () => {
    const elapsed = (performance.now() - start).toFixed(2)
    logger.info({
      message: `HTTP Response ${req.method} ${req.originalUrl} ${res.statusCode} is complied in ${elapsed}`,
      response: res.sendDate,
      request: req.body
    })
  })

  next()
}

const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  logger.error({
    message: 'Error',
    request: req.body,
    response: res.sendDate,
    error: err
  })

  next()
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack)

  if (res.headersSent) {
    next(err)
    return
  }

  if (err instanceof ValidationError) {
    res.status(400).json({ error: err.message, details: err.detail })
  } else if (err instanceof WrongConfigurationModeError) {
    res.status(500).json({ error: err.message, details: err.detail })
  } else if (err instanceof ModeError) {
    next(err)
    return
  } else {
    res.status(500).json({ error: err.message, stack: err.stack })
  }

  next(err)
}

export { errorHandler, errorLogger, requestLogger, bodySubstitution }
