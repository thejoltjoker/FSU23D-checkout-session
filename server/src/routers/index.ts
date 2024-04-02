import express from "express";

import productsRouter from "./products.router";
import userRouter from "./user.router";

const router = express.Router();

router.use("/user", userRouter);
router.use("/products", productsRouter);

export default router;
