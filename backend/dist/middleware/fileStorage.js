"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination(_req, _file, cb) {
        cb(null, "src/uploads");
    },
    filename(_req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
exports.imageUpload = multer_1.default({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: function (_req, file, cb) {
        if (!file.mimetype.includes("image")) {
            return cb(new Error("invalid file extension"));
        }
        cb(null, true);
    },
});
//# sourceMappingURL=fileStorage.js.map