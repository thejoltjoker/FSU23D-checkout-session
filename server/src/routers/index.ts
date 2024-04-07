import express from "express";

import deliveryRouter from "./delivery.router";
import productsRouter from "./products.router";
import userRouter from "./user.router";

const router = express.Router();

router.use("/user", userRouter);
router.use("/products", productsRouter);
router.use("/delivery", deliveryRouter);

export default router;
