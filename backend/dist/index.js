"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
let server;
mongoose_1.default.connect(config_1.config.mongoURI).then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
    server = app_1.default.listen(config_1.config.PORT, () => {
        console.log(`Server is working on http://localhost:${config_1.config.PORT}`);
    });
});
const unexpectedErrorHandler = (error) => {
    console.log(error);
    if (server) {
        server.close(() => {
            console.log("Server closed");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
//# sourceMappingURL=index.js.map