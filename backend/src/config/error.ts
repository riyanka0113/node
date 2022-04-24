//error handling
export class APIError extends Error {
  statusCode = 500;
  constructor(message: string, code: number) {
    super();
    this.message = message;
    this.statusCode = code;
  }

  getcode() {
    return this.statusCode;
  }
}
