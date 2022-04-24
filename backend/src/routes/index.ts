import * as express from "express";
import productRoute from "./product";
import cartRoute from "./cart";

const router = express.Router();

router.use("/product", productRoute);
router.use("/cart", cartRoute);

export default router;
