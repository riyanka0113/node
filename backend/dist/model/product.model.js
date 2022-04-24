"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const response_1 = require("../config/response");
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: [true, response_1.specific.name],
        trim: true,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    description: {
        type: String,
        required: [true, response_1.specific.description],
    },
    quantity: {
        type: Number,
        required: [true, response_1.specific.qty],
        default: 1,
    },
    price: {
        type: Number,
        required: [true, response_1.specific.price],
    },
});
productSchema.set("timestamps", true);
exports.default = mongoose_1.default.model("product", productSchema);
//# sourceMappingURL=product.model.js.map