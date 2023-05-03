import "reflect-metadata";
import "../extensions/validation-error-extensions.js";
import { injectable } from "inversify";
import { ValidationError } from "../exceptions/ValidationError.js";
import { getScoutsForPeriodQueryValidationScheme } from "./dto/validation.js";
import { IScoutService } from "./IScoutService.js";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import chalk from "chalk";
import { ScoutEventTypeRuDTO } from "./dto/ScoutEventTypeRuDTO.js";

@injectable()
class RandomScoutService implements IScoutService {
  async getScouts(query: GetScoutsForPeriodQuery): Promise<ScoutDTO[]> {
    const { error } = getScoutsForPeriodQueryValidationScheme.validate(query);
    if (error) {
      throw new ValidationError(error.message, error.detailsAsSting());
    }

    const scoutDTOs: ScoutDTO[] = [];

    for (let i = 0; i < 10; i++) {
      scoutDTOs.push(this.generateRandomScoutDTO());
    }

    console.info(`${chalk.blue("Generate random scout data.")}`);

    return scoutDTOs;
  }

  private generateRandomScoutDTO(): ScoutDTO {
    const randomMinute = faker.datatype.number({ min: 0, max: 7 });
    const randomSecond = faker.datatype.number({ min: 0, max: 59 });
    const randomTime = `0${randomMinute}:${randomSecond}`;

    const scoutEventTypeValues: (string | ScoutEventTypeRuDTO)[] = Object.values(
      ScoutEventTypeRuDTO,
    ).filter((x) => typeof x === "number");
    const randomEventTypeId: number = Number(faker.helpers.arrayElement(scoutEventTypeValues));
    const randomEventName: string = ScoutEventTypeRuDTO[randomEventTypeId];

    return {
      id: faker.datatype.number(),
      team: faker.company.name(),
      matchId: faker.datatype.number(),
      eventName: randomEventName,
      eventId: randomEventTypeId,
      minutes: randomTime,
      timeOfEvent: faker.date.recent().toString(),
      stage: faker.datatype.number({ min: 1, max: 4 }),
      eventTimestamp: faker.datatype.number(),
      playerId: faker.datatype.number(),
      player: faker.name.fullName(),
      triggerId: uuidv4(),
      changeType: faker.helpers.arrayElement(["ADDED", "REMOVED", "SYSTEM"]),
      timestamp: faker.datatype.number(),
    };
  }
}

export { IScoutService, RandomScoutService };
