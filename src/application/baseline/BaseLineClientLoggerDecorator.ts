import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../container/types.js";
import {
  GetMatchesForPeriodRequestModel,
  GetScoutsFroPeriodRequestModel,
  MatchModel,
  ScoutModel,
} from "./models/index.js";
import { IBaseLineClient } from "./IBaseLineClient.js";
import { logger } from "../../logger/logger.js";

@injectable()
class BaseLineClientLoggerDecorator implements IBaseLineClient {
  private client: IBaseLineClient;

  constructor(@inject(TYPES.BaseLineClient) client: IBaseLineClient) {
    this.client = client;
  }

  async getScoutsForPeriod(request: GetScoutsFroPeriodRequestModel): Promise<ScoutModel[]> {
    const start = performance.now();
    try {
      const response = await this.client.getScoutsForPeriod(request);
      const elapsed = (performance.now() - start).toFixed(2);

      logger.info({
        message: `Send GraphQL request to BaseLine API for scouts is completed successfully in ${elapsed} ms.`,
        request,
        response,
      });

      return response;
    } catch (error) {
      const elapsed = (performance.now() - start).toFixed(2);;
      logger.error({
        message: `Send GraphQL request to BaseLine API for scouts has failed in ${elapsed} ms.`,
        error,
        request,
      });
      throw error;
    }
  }

  async getMatchesForPeriod(request: GetMatchesForPeriodRequestModel): Promise<MatchModel[]> {
    const start = performance.now();
    try {
      const response = await this.client.getMatchesForPeriod(request);
      const elapsed = (performance.now() - start).toFixed(2);;

      logger.info({
        message: `Send GraphQL request to BaseLine API for matches is completed successfully in ${elapsed} ms.`,
        request,
        response,
      });

      return response;
    } catch (error) {
      const elapsed = (performance.now() - start).toFixed(2);;
      logger.error({
        message: `Send GraphQL request to BaseLine API for matches has failed in ${elapsed} ms.`,
        error,
        request,
      });
      throw error;
    }
  }
}

export { BaseLineClientLoggerDecorator };
