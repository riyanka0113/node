import mongoose from "mongoose";
import { specific } from "../config/response";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, specific.name],
    trim: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  description: {
    type: String,
    required: [true, specific.description],
  },
  quantity: {
    type: Number,
    required: [true, specific.qty],
    default: 1,
  },
  price: {
    type: Number,
    required: [true, specific.price],
  },
});

productSchema.set("timestamps", true);
export default mongoose.model("product", productSchema);
