import { faker } from '@faker-js/faker'
import { injectable } from 'inversify'
import { type IRandomMatchGenerator } from './IRandomMatchGenerator.js'
import { type MatchDTO } from '../dto/index.js'
import { type LocalizedStringDTO } from '../dto/MatchDTO.js'

@injectable()
class RandomMatchGenerator implements IRandomMatchGenerator {
  generateArray(count: number): MatchDTO[] {
    if (count <= 0) {
      throw new Error(`Can't generate matches less than 1. provided count ${count}`)
    }

    const matchDTOs: MatchDTO[] = []
    for (let i = 0; i < 10; i++) {
      matchDTOs.push(this.generate())
    }
    return matchDTOs
  }

  generate(): MatchDTO {
    const period = faker.datatype.number({ min: 0, max: 4 })

    return {
      id: faker.datatype.number(),
      name: faker.company.name(),
      startedAt: faker.date.recent().toISOString().slice(0, -5),
      status: faker.helpers.arrayElement([
        'planned',
        'live',
        'done',
        'canceled',
        'delayed',
        'new_value'
      ]),
      homeTeam: {
        id: faker.datatype.number(),
        names: this.generateLocalizedStringDTO(),
        probability: faker.datatype.float({ min: 0, max: 10, precision: 2 }),
        total: faker.datatype.float({ min: 0, max: 10, precision: 2 })
      },
      awayTeam: {
        id: faker.datatype.number(),
        names: this.generateLocalizedStringDTO(),
        probability: faker.datatype.float({ min: 0, max: 10, precision: 2 }),
        total: faker.datatype.float({ min: 0, max: 10, precision: 2 })
      },
      periodScores:
        period !== 0
          ? Array.from({ length: period }, (_, i) => ({
              period: i + 1,
              homeScore: faker.datatype.number({ min: 0, max: 10 }),
              awayScore: faker.datatype.number({ min: 0, max: 10 })
            }))
          : undefined,
      period,
      homeScore: faker.datatype.number({ min: 0, max: 15 }),
      awayScore: faker.datatype.number({ min: 0, max: 15 }),
      shootoutsScores: faker.helpers.arrayElement([
        Array.from({ length: faker.datatype.number({ min: 0, max: 10 }) }, (_, i) => ({
          number: i + 1,
          owner: i % 2 === 1 ? 'home' : 'away',
          isScored: faker.datatype.boolean()
        })),
        undefined
      ]),
      betStatus: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
      dateTime: faker.datatype.datetime({ min: 1680000000, max: Date.now() }),
      season: {
        id: faker.datatype.number(),
        names: this.generateLocalizedStringDTO(),
        startDate: faker.date.recent().toISOString().slice(0, -5),
        endDate: faker.date.future().toISOString().slice(0, -5)
      },
      tournament: {
        id: faker.datatype.number(),
        names: this.generateLocalizedStringDTO()
      },
      sport: {
        id: faker.datatype.number(),
        names: this.generateLocalizedStringDTO()
      },
      country: {
        id: faker.datatype.number(),
        names: this.generateLocalizedStringDTO()
      },
      venue: {
        id: faker.datatype.number(),
        names: this.generateLocalizedStringDTO()
      }
    }
  }

  generateLocalizedStringDTO(): LocalizedStringDTO {
    return {
      ru: faker.lorem.word(),
      en: faker.lorem.word()
    }
  }
}

export { RandomMatchGenerator }
