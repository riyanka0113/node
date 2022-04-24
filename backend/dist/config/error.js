"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError extends Error {
    constructor(message, code) {
        super();
        this.statusCode = 500;
        this.message = message;
        this.statusCode = code;
    }
    getcode() {
        return this.statusCode;
    }
}
exports.APIError = APIError;
//# sourceMappingURL=error.js.map