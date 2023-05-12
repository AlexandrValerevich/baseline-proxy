abstract class ApplicationError extends Error {
  constructor(message: string, details?: string) {
    super(message);
    this.detail = details;
  }
  detail?: string;
}

export { ApplicationError };
