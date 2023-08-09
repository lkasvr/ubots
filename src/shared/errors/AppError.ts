class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly genericError: unknown;

  constructor(message: string, genericError?: unknown, statusCode = 400,) {
    this.message = message;
    this.statusCode = statusCode;
    this.genericError = genericError;
  }
}

export default AppError;
