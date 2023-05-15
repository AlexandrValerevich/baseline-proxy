import {
  IModeConfigurationService,
  ModeError,
  ValidationError,
  WrongConfigurationModeError,
} from "../../application/index.js";
import { TYPES, container } from "../../container/index.js";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../logger/index.js";

class Middleware {
  public static bodySubstitution(req: Request, res: Response, next: NextFunction) {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
    if (modeService.getMode() !== "body_substitution") {
      next();
      return;
    }
    const message = modeService.getBodySubstitutionMessage();
    res.send(message);
    logger.debug({ message: `Current mode is BodySubstitution.`, body: message });
    return;
  }

  public static logger(req: Request, res: Response, next: NextFunction) {
    logger.debug({
      message: `HTTP Request ${req.method} ${req.originalUrl}`,
      headers: req.headers,
      request: req.body,
    });

    const start = performance.now();
    res.on("close", () => {
      const elapsed = (performance.now() - start).toFixed(2);
      logger.info({
        message: `HTTP Response ${req.method} ${req.originalUrl} ${res.statusCode} is complied in ${elapsed}`,
        response: res.sendDate,
        request: req.body,
      });
    });

    next();
  }

  public static errorLogger(err: Error, req: Request, res: Response, next: NextFunction) {
    logger.error({
      message: `Error`,
      request: req.body,
      response: res.sendDate,
      error: err,
    });

    next();
  }

  public static errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);

    if (res.headersSent) {
      return next(err);
    }

    if (err instanceof ValidationError) {
      res.status(400).json({ error: err.message, details: err.detail });
    } else if (err instanceof WrongConfigurationModeError) {
      res.status(500).json({ error: err.message, details: err.detail });
    } else if (err instanceof ModeError) {
      return next(err);
    } else {
      res.status(500).json({ error: err.message, stack: err.stack });
    }

    next(err);
  }
}

export default Middleware;
