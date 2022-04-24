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
const error_1 = require("../config/error");
const cart_model_1 = __importDefault(require("../model/cart.model"));
const response_1 = require("../config/response");
const product_model_1 = __importDefault(require("../model/product.model"));
class CartController {
    createCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_model_1.default.findById(req.body.id);
            if (!product) {
                throw new error_1.APIError(response_1.error.NOT_FOUND, response_1.code.NOT_FOUND);
            }
            if (product.quantity < req.body.quantity) {
                throw new error_1.APIError(response_1.error.BAD_REQUEST, response_1.code.BAD_REQUEST);
            }
            const data = {
                productID: product._id,
                count: req.body.quantity,
                price: req.body.price,
            };
            const cart = yield cart_model_1.default.create(data);
            res.status(response_1.code.OK).json({
                success: true,
                data: cart,
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.default.findByIdAndUpdate(req.body.id, req.body);
            res.status(response_1.code.OK).json({
                success: true,
                data: cart,
            });
        });
    }
    getCart(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Cart = yield cart_model_1.default.aggregate([
                {
                    $lookup: {
                        localField: "productID",
                        from: "products",
                        foreignField: "_id",
                        as: "product",
                    },
                },
            ]);
            res.status(response_1.code.OK).json({
                success: true,
                data: Cart,
            });
        });
    }
}
exports.default = new CartController();
//# sourceMappingURL=cart.controller.js.map