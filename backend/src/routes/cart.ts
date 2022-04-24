import * as express from "express";
import cartController from "../controller/cart.controller";
import { use } from "../middleware/handleError";

const router = express.Router();

//create cart
router.post("/", use(cartController.createCart));
router.patch("/", use(cartController.update));

//get all cart
router.get("/", use(cartController.getCart));

export default router;
