"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CartItemSchema = new mongoose_1.default.Schema({
    productID: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "product",
        required: true,
    },
    price: Number,
    count: Number,
}, { timestamps: true });
exports.default = mongoose_1.default.model("cart", CartItemSchema);
//# sourceMappingURL=cart.model.js.map