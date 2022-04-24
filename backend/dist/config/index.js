"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var config;
(function (config) {
    config[config["PORT"] = 4000] = "PORT";
    config["mongoURI"] = "mongodb://localhost:27017/product?readPreference=primary&ssl=false&directConnection=true";
})(config = exports.config || (exports.config = {}));
//# sourceMappingURL=index.js.map