import { Router, Request, Response } from "express";
import { TYPES, container } from "../../container/index.js";
import { IModeConfigurationService } from "../../application/index.js";
import { ScoutModel } from "../contracts/index.js";

const scoutRouter = Router();

scoutRouter
  .get("/api/scout", (req: Request, res: Response<ScoutModel[]>) => {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
    const scoutsDto = modeService.getPredefinedScouts();
    return res.json(scoutsDto);
  })
  .put("/api/scout", (req: Request<{}, {}, ScoutModel[]>, res: Response) => {
    const scouts = req.body;
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
    modeService.setPredefinedScouts(scouts);
    return res.status(204).send();
  });

export { scoutRouter };
