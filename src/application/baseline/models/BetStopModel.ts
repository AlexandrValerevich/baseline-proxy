import { BetStopStatusModel} from "./BetStopStatusModel.js";
import { BetStopTypeModel } from "./BetStopTypeModel.js";

interface BetStopModel {
  type: BetStopTypeModel;
  value: BetStopStatusModel;
  updatedBy: string;
  updatedAt: string;
}

export { BetStopModel };
