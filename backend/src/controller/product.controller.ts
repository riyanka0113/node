import { Request, Response } from "express";
import fs from "fs";
import { code } from "../config/response";
import productModel from "../model/product.model";

class ProductController {
  async createProduct(req: Request, res: Response) {
    const image = fs.readFileSync(
      req.file?.path || `src/uploads/${req.file?.filename}`
    );
    const body = {
      ...req.body,
      image: {
        data: Buffer.from(image.toString("base64"), "base64"),
        contentType: req.file?.mimetype,
      },
    };
    console.log(body, "bp");

    const product = await productModel.create(body);
    res.status(code.OK).json({
      success: true,
      data: product,
    });
  }

  async getProduct(_req, res: Response) {
    const product = await productModel.find();
    res.status(code.OK).json({
      success: true,
      data: product,
    });
  }
}

export default new ProductController();
