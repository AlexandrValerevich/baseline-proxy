import { faker } from '@faker-js/faker'
import { injectable } from 'inversify'
import { type ScoutDTO, ScoutEventTypeRuDTO } from '../dto/index.js'
import { type IRandomScoutGenerator } from './IRandomScoutGenerator.js'

@injectable()
class RandomScoutGenerator implements IRandomScoutGenerator {
  generateArray(count: number): ScoutDTO[] {
    if (count <= 0) {
      throw new Error(`Can't generate scouts less than 1. provided count ${count}`)
    }

    const scoutDTOs: ScoutDTO[] = []
    for (let i = 0; i < 10; i++) {
      scoutDTOs.push(this.generate())
    }
    return scoutDTOs
  }

  generate(): ScoutDTO {
    return {
      id: faker.datatype.number(),
      matchId: faker.datatype.number(),
      owner: faker.helpers.arrayElement(['game', 'home', 'away', 'new_value']),
      eventId: this.getRandomEventType(),
      ingameTime: faker.date
        .between('2000-01-01T00:00:00.000Z', '2000-01-01T07:00:00.000Z')
        .toISOString()
        .slice(11, 16),
      dateTime: faker.datatype.datetime({ min: 0, max: Date.now() }),
      changeType: faker.helpers.arrayElement(['added', 'removed', 'restored', 'new_value']),
      period: faker.datatype.number({min: 1, max: 4})
    }
  }

  private getRandomEventType(): number {
    const eventTypeKeys = Object.keys(ScoutEventTypeRuDTO).filter((key) => isNaN(parseInt(key)))
    const randomIndex = faker.datatype.number(eventTypeKeys.length - 1)
    const randomEventTypeKey = eventTypeKeys[randomIndex]
    const eventId = ScoutEventTypeRuDTO[randomEventTypeKey]
    return eventId
  }
}

export { RandomScoutGenerator }
