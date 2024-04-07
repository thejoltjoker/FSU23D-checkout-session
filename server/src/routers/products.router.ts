import express from "express";
import {
  getAllCoupons,
  getAllPrices,
  getAllProducts,
  getProduct,
} from "../controllers/products.controller";

export const router = express.Router();

router.get("/coupons", getAllCoupons); // TODO remove route before deploy
router.get("/", getAllProducts);
router.get("/:productId", getProduct);
router.get("/:productId/prices", getAllPrices);

export default router;
