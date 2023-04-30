interface ErrorDTO {
  number: number;
  isSended: boolean;
  http: { status: number };
  message: string;
  details?: string;
}
