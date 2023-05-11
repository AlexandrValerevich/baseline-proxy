import { Router, Request, Response } from "express";
import { TYPES, container } from "../../container/index.js";
import { IModeConfigurationService } from "../../application/index.js";
import { MatchModel } from "../contracts/index.js";

const matchRouter = Router();

matchRouter
  .get("/api/match", (req: Request, res: Response<MatchModel[]>) => {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
    const matchesDto = modeService.getPredefinedMatches();
    return res.json(matchesDto);
  })
  .put("/api/match", (req: Request<{}, {}, MatchModel[]>, res: Response) => {
    const matches = req.body;
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
    modeService.setPredefinedMatches(matches);
    return res.status(204).send();
  });

export { matchRouter };
