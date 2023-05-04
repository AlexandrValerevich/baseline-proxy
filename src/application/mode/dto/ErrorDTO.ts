interface ErrorDTO {
  http: { status: number };
  message: string;
  details?: string;
}

export { ErrorDTO };
