import express from "express";

import checkoutRouter from "./checkout.router";
import deliveryRouter from "./delivery.router";
import productsRouter from "./products.router";
import userRouter from "./user.router";

const router = express.Router();

router.use("/user", userRouter);
router.use("/products", productsRouter);
router.use("/delivery", deliveryRouter);
router.use("/checkout", checkoutRouter);

export default router;
