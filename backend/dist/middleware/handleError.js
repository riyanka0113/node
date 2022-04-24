"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = exports.errorConverter = exports.use = void 0;
const response_1 = require("../config/response");
const error_1 = require("../config/error");
const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.use = use;
const errorConverter = (_, __, next) => {
    const err = new error_1.APIError(`${response_1.specific.PATH} ${response_1.error.NOT_FOUND}`, response_1.code.NOT_FOUND);
    next(err);
};
exports.errorConverter = errorConverter;
const handleErrors = (err, _, res, _next) => {
    if (err instanceof error_1.APIError) {
        return res.status(err.getcode()).json({
            success: false,
            message: err.message,
        });
    }
    else {
        return res.status(response_1.code.INTERNAL).json({
            success: false,
            message: err.message,
        });
    }
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=handleError.js.map