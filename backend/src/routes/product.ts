import * as express from "express";
import { imageUpload } from "../middleware/fileStorage";
import productController from "../controller/product.controller";
import { use } from "../middleware/handleError";

const router = express.Router();

//create product
router.post(
  "/",
  imageUpload.single("file"),
  use(productController.createProduct)
);

//get all product
router.get("/", use(productController.getProduct));

export default router;
