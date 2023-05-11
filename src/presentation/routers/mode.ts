import { Router, Request, Response } from "express";
import { TYPES, container } from "../../container/index.js";
import { IModeConfigurationService } from "../../application/index.js";
import { ChangeModeRequest } from "../contracts/index.js";

const modeRouter = Router();

modeRouter
  .get("/api/mode", (req: Request, res: Response) => {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
    const mode = modeService.getMode();
    return res.json(mode);
  })
  .put("/api/mode", (req: Request<{}, {}, ChangeModeRequest>, res: Response) => {
    const { mode } = req.body;
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
    const modeDto = mode;
    if (!modeDto) {
      return res.status(400).json({
        error: `Invalid mode: ${mode}. Possible values [ direct | random | predefined_response | error_once | error_infinity | body_substitution ]`,
      });
    }
    modeService.setMode(modeDto);
    return res.status(204).send();
  });

export { modeRouter };
