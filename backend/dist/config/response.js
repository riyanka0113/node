"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specific = exports.error = exports.code = void 0;
var code;
(function (code) {
    code[code["INTERNAL"] = 500] = "INTERNAL";
    code[code["NOT_FOUND"] = 404] = "NOT_FOUND";
    code[code["OK"] = 200] = "OK";
    code[code["CREATED"] = 201] = "CREATED";
    code[code["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    code[code["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    code[code["FORBIDDEN"] = 403] = "FORBIDDEN";
    code[code["CONFLICT"] = 409] = "CONFLICT";
})(code = exports.code || (exports.code = {}));
var error;
(function (error) {
    error["INTERNAL"] = "Internal Server Error";
    error["UNAUTHORIZED"] = "Unauthorized";
    error["NOT_FOUND"] = "Not Found";
    error["BAD_REQUEST"] = "Invalid";
    error["CONFLICT"] = "Already Exist";
})(error = exports.error || (exports.error = {}));
var specific;
(function (specific) {
    specific["PATH"] = "Path";
    specific["name"] = "Please Enter Product Name";
    specific["description"] = "Please Enter product Description";
    specific["qty"] = "Please Enter product Quantity";
    specific["price"] = "Please Enter product Unit Price";
})(specific = exports.specific || (exports.specific = {}));
//# sourceMappingURL=response.js.map