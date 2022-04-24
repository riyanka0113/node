import { Request, Response } from "express";
import { APIError } from "../config/error";
import cartModel from "../model/cart.model";
import { code, error } from "../config/response";
import productModel from "../model/product.model";

class CartController {
  async createCart(req: Request, res: Response) {
    const product = await productModel.findById(req.body.id);
    if (!product) {
      throw new APIError(error.NOT_FOUND, code.NOT_FOUND);
    }

    if (product.quantity < req.body.quantity) {
      throw new APIError(error.BAD_REQUEST, code.BAD_REQUEST);
    }

    const data = {
      productID: product._id,
      count: req.body.quantity,
      price: req.body.price,
    };

    const cart = await cartModel.create(data);

    res.status(code.OK).json({
      success: true,
      data: cart,
    });
  }

  async update(req: Request, res: Response) {
    const cart = await cartModel.findByIdAndUpdate(req.body.id, req.body);

    res.status(code.OK).json({
      success: true,
      data: cart,
    });
  }

  async getCart(_req, res: Response) {
    const Cart = await cartModel.aggregate([
      {
        $lookup: {
          localField: "productID",
          from: "products",
          foreignField: "_id",
          as: "product",
        },
      },
    ]);

    res.status(code.OK).json({
      success: true,
      data: Cart,
    });
  }
}

export default new CartController();
