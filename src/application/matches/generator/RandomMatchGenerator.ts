import { faker } from "@faker-js/faker";
import { injectable } from "inversify";
import { v4 as uuidv4 } from "uuid";
import { IRandomMatchGenerator } from "./IRandomMatchGenerator.js";
import {
  BetStopStatusDTO,
  BetStopTypeDTO,
  BetStopValueDTO,
  MatchDTO,
  MatchStatusDTO,
  TimerStatusDTO,
} from "../dto/index.js";

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
    const randomBetstopStatus = faker.helpers.arrayElement(
      Object.values(BetStopStatusDTO).filter((x) => typeof x === "number"),
    ) as BetStopStatusDTO;
    const randomBetstopType = faker.helpers.arrayElement(
      Object.values(BetStopTypeDTO).filter((x) => typeof x === "number"),
    ) as BetStopTypeDTO;
    const randomBetstopValue = faker.helpers.arrayElement(
      Object.values(BetStopValueDTO).filter((x) => typeof x === "number"),
    ) as BetStopValueDTO;
    const randomMatchStatus = faker.helpers.arrayElement(
      Object.values(MatchStatusDTO).filter((x) => typeof x === "number"),
    ) as MatchStatusDTO;
    const randomTimerStatus = faker.helpers.arrayElement(
      Object.values(TimerStatusDTO).filter((x) => typeof x === "number"),
    ) as TimerStatusDTO;

    return {
      id: faker.datatype.number(),
      name: faker.company.name(),
      startedAt: faker.date.recent().toISOString().slice(0, -5),
      status: randomMatchStatus as MatchStatusDTO,
      homeTeam: {
        id: faker.datatype.number(),
        name: faker.company.name(),
        languageCode: "RU",
      },
      awayTeam: {
        id: faker.datatype.number(),
        name: faker.company.name(),
        languageCode: "RU",
      },
      ingameTime: "00:00",
      betstopStatus: randomBetstopValue,
      refundStatus: faker.datatype.boolean(),
      triggerId: uuidv4(),
      options: {
        periods: faker.datatype.number({ min: 2, max: 4 }),
        periodTime: faker.datatype.number({ min: 5, max: 20 }),
      },
      homeScore: faker.datatype.number({ min: 0, max: 10 }),
      awayScore: faker.datatype.number({ min: 0, max: 10 }),
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
      timer: faker.datatype.number({ min: 0, max: 90 }),
      timerStatus: randomTimerStatus,
      betstop: [
        {
          type: randomBetstopType,
          value: randomBetstopStatus,
          updatedBy: faker.name.firstName(),
          updatedAt: faker.date.recent().toISOString().slice(0, -5),
        },
      ],
      assignedTrader: {
        id: faker.datatype.number(),
        name: faker.name.firstName(),
        email: faker.internet.email(),
      },
      leagueName: faker.random.word(),
      homeCorrection: faker.datatype.number({ min: 0, max: 5 }),
      awayCorrection: faker.datatype.number({ min: 0, max: 5 }),
      homeTotal: faker.datatype.number({ min: 0, max: 10 }),
      awayTotal: faker.datatype.number({ min: 0, max: 10 }),
      matchDelay: faker.datatype.boolean(),
      timestamp: faker.datatype.number(),
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
