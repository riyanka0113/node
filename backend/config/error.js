class APIError extends Error {
    statusCode = 500;
    constructor(message, code) {
      super();
      this.message = message;
      this.statusCode = code;
    }
  
    getcode() {
      return this.statusCode;
    }
  }

  module.exports = APIError;