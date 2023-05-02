import "reflect-metadata";
import "../extensions/validation-error-extensions.js";
import { injectable } from "inversify";
import { ValidationError } from "../exceptions/ValidationError.js";
import { getScoutsForPeriodQueryValidationScheme } from "./validation/getScoutsForPeriodQueryValidationScheme.js";
import { IScoutService } from "./IScoutService.js";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

@injectable()
class RandomScoutService implements IScoutService {
  getScouts(query: GetScoutsForPeriodQuery): ScoutDTO[] {
    const { error } = getScoutsForPeriodQueryValidationScheme.validate(query);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }

    const scoutDTOs: ScoutDTO[] = [];

    for (let i = 0; i < 10; i++) {
      scoutDTOs.push(this.generateRandomScoutDTO());
    }

    return scoutDTOs;
  }

  private generateRandomScoutDTO(): ScoutDTO {
    const randomMinute = faker.datatype.number({ min: 0, max: 7 });
    const randomSecond = faker.datatype.number({ min: 0, max: 59 });
    const randomTime = `0${randomMinute}:${randomSecond}`;

    return {
      id: faker.datatype.number(),
      team: faker.company.name(),
      matchId: faker.datatype.number(),
      eventName: faker.random.word(),
      eventId: faker.datatype.number(),
      minutes: randomTime,
      timeOfEvent: faker.date.recent().toString(),
      stage: faker.datatype.number({ min: 1, max: 4 }),
      eventTimestamp: faker.datatype.number(),
      playerId: faker.datatype.number(),
      player: faker.name.fullName(),
      triggerId: uuidv4(),
      changeType: faker.random.word(),
      timestamp: faker.datatype.number(),
    };
  }
}

export { IScoutService, RandomScoutService };
