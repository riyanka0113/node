"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const response_1 = require("../config/response");
const product_model_1 = __importDefault(require("../model/product.model"));
class ProductController {
    createProduct(req, res) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const image = fs_1.default.readFileSync(((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || `src/uploads/${(_b = req.file) === null || _b === void 0 ? void 0 : _b.filename}`);
            const body = Object.assign(Object.assign({}, req.body), { image: {
                    data: Buffer.from(image.toString("base64"), "base64"),
                    contentType: (_c = req.file) === null || _c === void 0 ? void 0 : _c.mimetype,
                } });
            console.log(body, "bp");
            const product = yield product_model_1.default.create(body);
            res.status(response_1.code.OK).json({
                success: true,
                data: product,
            });
        });
    }
    getProduct(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.find();
            res.status(response_1.code.OK).json({
                success: true,
                data: product,
            });
        });
    }
}
exports.default = new ProductController();
//# sourceMappingURL=product.controller.js.map