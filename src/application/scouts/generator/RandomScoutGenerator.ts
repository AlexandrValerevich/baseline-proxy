import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { injectable } from "inversify";
import { ScoutDTO, ScoutEventTypeRuDTO } from "../dto/index.js";
import { IRandomScoutGenerator } from "./IRandomScoutGenerator.js";

@injectable()
class RandomScoutGenerator implements IRandomScoutGenerator {
  generateArray(count: number): ScoutDTO[] {
    if (count <= 0) {
      throw new Error(`Can't generate scouts less than 1. provided count ${count}`);
    }

    const scoutDTOs: ScoutDTO[] = [];
    for (let i = 0; i < 10; i++) {
      scoutDTOs.push(this.generate());
    }
    return scoutDTOs;
  }

  generate(): ScoutDTO {
    const randomMinute = faker.datatype.number({ min: 0, max: 7 });
    const randomSecond = faker.datatype.number({ min: 0, max: 59 });
    const randomTime = `0${randomMinute}:${randomSecond < 0 ? "0" + randomSecond : randomSecond}`;

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
      timeOfEvent: faker.date.recent().toISOString().slice(0, -5),
      stage: faker.datatype.number({ min: 1, max: 4 }),
      eventTimestamp: faker.datatype.number(),
      playerId: faker.datatype.number(),
      player: faker.name.fullName(),
      triggerId: uuidv4(),
      changeType: faker.helpers.arrayElement(["ADDED", "REMOVED", "SYSTEM"]),
      timestamp: faker.datatype.number({ min: 1680000000, max: Date.now() }),
    };
  }
}

export { RandomScoutGenerator };
