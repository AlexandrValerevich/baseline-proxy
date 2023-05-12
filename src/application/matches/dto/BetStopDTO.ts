type BetStopStatusDTO = "ok" | "stop" | "ready_to_start";
type BetStopTypeDTO = "scout" | "system" | "analyst";

interface BetStopDTO {
  type: BetStopTypeDTO;
  value: BetStopStatusDTO;
  updatedBy: string;
  updatedAt: string;
}

export { BetStopDTO, BetStopStatusDTO, BetStopTypeDTO };
