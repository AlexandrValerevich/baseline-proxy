import { BetStopStatusDTO } from "./BetStopStatusDTO.js";
import { BetStopTypeDTO } from "./BetStopTypeDTO.js";

interface BetStopDTO {
  type: BetStopTypeDTO;
  value: BetStopStatusDTO;
  updatedBy: string;
  updatedAt: string;
}

export { BetStopDTO };
