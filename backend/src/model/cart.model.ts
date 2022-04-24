import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    productID: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      required: true,
    },
    price: Number,
    count: Number,
  },
  { timestamps: true }
);

export default mongoose.model("cart", CartItemSchema);
