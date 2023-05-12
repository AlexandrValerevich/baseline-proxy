import { Router, Request, Response } from "express";
import { TYPES, container } from "../../container/index.js";
import { IModeConfigurationService } from "../../application/index.js";

const delayRouter = Router();

delayRouter
  .get("/api/delay", (req: Request, res: Response<{ delay: number }>) => {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
    const delay = modeService.getDelay();
    return res.json({ delay });
  })
  .put("/api/delay", (req: Request<{}, {}, { delay }>, res: Response) => {
    const { delay } = req.body;
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
    modeService.setDelay(delay);
    return res.status(204).send();
  });

export { delayRouter };
