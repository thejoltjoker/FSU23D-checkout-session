import express from "express";
import { getOrders, saveOrder } from "../controllers/orders.controller";
import { OrderSchema } from "../schemas/OrderSchema";
import { validate } from "../middleware/validate";
import authCheck from "../middleware/authCheck";

export const router = express.Router();

router.post("/save", authCheck, validate(OrderSchema), saveOrder);
router.get("/:customerId", authCheck, getOrders); // TODO make sure the user can only see their own orders

export default router;
