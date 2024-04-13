import express from "express";

import checkoutRouter from "./checkout.router";
import emailRouter from "./email.router";
import ordersRouter from "./orders.router";
import productsRouter from "./products.router";
import shippingRouter from "./shipping.router";
import userRouter from "./user.router";

const router = express.Router();

router.use("/user", userRouter);
router.use("/products", productsRouter);
router.use("/shipping", shippingRouter);
router.use("/checkout", checkoutRouter);
router.use("/orders", ordersRouter);
router.use("/email", emailRouter);

export default router;
