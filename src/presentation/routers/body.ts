import { Router, Request, Response } from "express";
import { TYPES, container } from "../../container/index.js";
import { IModeConfigurationService } from "../../application/index.js";

const bodyRouter = Router();

bodyRouter
  .get("/api/body", (req: Request, res: Response) => {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
    const body = modeService.getBodySubstitutionMessage();
    return res.send(body);
  })
  .put("/api/body", (req: Request<{}, {}, string>, res: Response) => {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
    modeService.setBodySubstitutionMessage(req.body);
    return res.status(204).send();
  });

export { bodyRouter };
