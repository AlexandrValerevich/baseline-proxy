import { ApplicationError } from "./ApplicationError.js";

class ValidationError extends ApplicationError {
  constructor(message: string, detail?: string) {
    super(message, detail);
    this.name = "ValidationError";
  }

  detail?: string;
  message: string;
}

export { ValidationError };
