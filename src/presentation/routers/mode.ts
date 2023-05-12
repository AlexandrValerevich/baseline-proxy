import { Router, Request, Response } from "express";
import { TYPES, container } from "../../container/index.js";
import { IModeConfigurationService } from "../../application/index.js";
import { ChangeModeRequest } from "../contracts/index.js";
import { body, validationResult } from "express-validator";

const modeRouter = Router();

modeRouter
  .get("/api/mode", (req: Request, res: Response) => {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
    const mode = modeService.getMode();
    return res.json({ mode });
  })
  .put(
    "/api/mode",
    [
      body("mode").isIn([
        "direct",
        "random",
        "predefined_response",
        "error_once",
        "error_infinity",
        "body_substitution",
      ]),
    ],
    (req: Request<{}, {}, ChangeModeRequest>, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          details:
            "Mode must be one of [direct, random, predefined_response, body_substitution, error_once, error_infinity]",
        });
      }
      const { mode } = req.body;
      const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
      modeService.setMode(mode);
      return res.status(204).send();
    },
  );

export { modeRouter };
