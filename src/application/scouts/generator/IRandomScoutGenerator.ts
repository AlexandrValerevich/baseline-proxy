import { ScoutDTO } from "../dto/index.js";

export interface IRandomScoutGenerator {
    generate(): ScoutDTO;
    generateArray(count: number): ScoutDTO[];
}
