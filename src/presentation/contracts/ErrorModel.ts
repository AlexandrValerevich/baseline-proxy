interface ErrorModel {
    http: { status: number };
    message: string;
    details?: string;
  }
  
  export { ErrorModel };
  