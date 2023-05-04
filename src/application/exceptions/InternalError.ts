import { ApplicationError } from "./ApplicationError.js";

class InternalError extends ApplicationError {
  constructor(detail?: string) {
    super("Internal Error", detail);
    this.name = "InternalError";
  }

  detail?: string;
  message: string;
}

export { InternalError };
