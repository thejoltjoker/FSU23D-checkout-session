import express from "express";
import {
  getAllProducts,
  getCouponIdFromPromotion,
  getProduct,
} from "../controllers/products.controller";

export const router = express.Router();

// router.get("/coupons", getAllCoupons); // TODO remove route before deploy
router.get("/", getAllProducts);
router.get("/:productId", getProduct);
router.get("/promotions/check/:promotionCode", getCouponIdFromPromotion);
// router.get("/:productId/prices", getAllPrices); // TODO remove route before deploy

export default router;
