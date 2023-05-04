import { ApplicationError } from "./ApplicationError.js";

class ModeError extends ApplicationError {
  constructor(message: string, http: { status: number }, detail?: string) {
    super(message, detail);
    this.name = "ModeError";
    this.http = http;
  }

  detail?: string;
  message: string;
  http: { status: number };
}

export { ModeError };
