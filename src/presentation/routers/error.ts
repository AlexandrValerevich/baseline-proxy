import { Router, Request, Response } from "express";
import { TYPES, container } from "../../container/index.js";
import { IModeConfigurationService } from "../../application/index.js";
import { ErrorModel } from "../contracts/ErrorModel.js";

const errorRouter = Router();

errorRouter
  .get("/api/error", (req: Request, res: Response<ErrorModel>) => {
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
    const errorDto = modeService.getError();
    return res.json(errorDto);
  })
  .put("/api/error", (req: Request<{}, {}, ErrorModel>, res: Response) => {
    const error = req.body;
    const modeService = container.get<IModeConfigurationService>(TYPES.ModeConfigurationService);
    modeService.setError(error);
    return res.status(204).send();
  });

export { errorRouter };
