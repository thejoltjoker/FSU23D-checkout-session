import express from "express";

import checkoutRouter from "./checkout.router";
import shippingRouter from "./shipping.router";
import productsRouter from "./products.router";
import userRouter from "./user.router";
import ordersRouter from "./orders.router";

const router = express.Router();

router.use("/user", userRouter);
router.use("/products", productsRouter);
router.use("/shipping", shippingRouter);
router.use("/checkout", checkoutRouter);
router.use("/orders", ordersRouter);

export default router;
