import express from "express";
import {
  getAllProducts,
  getCouponIdFromPromotion,
  getProduct,
} from "../controllers/products.controller";

export const router = express.Router();

router.get("/", getAllProducts);
router.get("/:productId", getProduct);
router.get("/promotions/check/:promotionCode", getCouponIdFromPromotion);

export default router;
