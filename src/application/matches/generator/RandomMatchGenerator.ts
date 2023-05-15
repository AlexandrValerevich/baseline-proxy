import { faker } from "@faker-js/faker";
import { injectable } from "inversify";
import { IRandomMatchGenerator } from "./IRandomMatchGenerator.js";
import { MatchDTO } from "../dto/index.js";

@injectable()
class RandomMatchGenerator implements IRandomMatchGenerator {
  generateArray(count: number): MatchDTO[] {
    if (count <= 0) {
      throw new Error(`Can't generate matches less than 1. provided count ${count}`);
    }

    const matchDTOs: MatchDTO[] = [];
    for (let i = 0; i < 10; i++) {
      matchDTOs.push(this.generate());
    }
    return matchDTOs;
  }

  generate(): MatchDTO {
    return {
      id: faker.datatype.number(),
      name: faker.company.name(),
      startedAt: faker.date.recent().toISOString().slice(0, -5),
      status: faker.helpers.arrayElement([
        "planned",
        "prematch",
        "live",
        "done",
        "forecast_missed",
      ]),
      homeTeam: {
        id: faker.datatype.number(),
        name: faker.company.name(),
        languageCode: "RU",
        probability: faker.datatype.number({ min: 0, max: 10 }),
        total: faker.datatype.number({ min: 0, max: 10 }),
      },
      awayTeam: {
        id: faker.datatype.number(),
        name: faker.company.name(),
        languageCode: "RU",
        probability: faker.datatype.number({ min: 0, max: 10 }),
        total: faker.datatype.number({ min: 0, max: 10 }),
      },

      periodScores: Array.from({ length: 3 }, (_, i) => ({
        period: i + 1,
        homeScore: faker.datatype.number({ min: 0, max: 10 }),
        awayScore: faker.datatype.number({ min: 0, max: 10 }),
      })),
      period: faker.datatype.number({ min: 1, max: 3 }),
      aftermatchShootouts: faker.datatype.boolean(),
      shootoutsScores: {
        homeScores: Array.from({ length: 5 }, () => faker.datatype.number({ min: 0, max: 1 })),
        awayScores: Array.from({ length: 5 }, () => faker.datatype.number({ min: 0, max: 1 })),
      },
      betstop: [
        {
          type: faker.helpers.arrayElement(["scout", "system", "analyst"]),
          value: faker.helpers.arrayElement(["ok", "stop", "ready_to_start"]),
          updatedBy: faker.name.firstName(),
          updatedAt: faker.date.recent().toISOString().slice(0, -5),
        },
      ],
      timestamp: faker.datatype.number({ min: 1680000000, max: Date.now() }),
      season: {
        id: faker.datatype.number(),
        name: faker.lorem.word(),
        languageCode: "RU",
        startDate: faker.date.recent().toISOString().slice(0, -5),
        endDate: faker.date.future().toISOString().slice(0, -5),
      },
      tournament: {
        id: faker.datatype.number(),
        name: faker.lorem.word(),
        languageCode: "RU",
      },
      sport: {
        id: faker.datatype.number(),
        name: "hockey",
        languageCode: "RU",
      },
      country: {
        id: faker.datatype.number(),
        name: faker.address.country(),
        languageCode: "RU",
      },
      venue: {
        id: faker.datatype.number(),
        name: faker.company.name(),
        languageCode: "RU",
      },
    };
  }
}

export { RandomMatchGenerator };
