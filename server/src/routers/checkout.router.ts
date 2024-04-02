import express from "express";
import { createSession } from "../controllers/checkout.controller";
import authCheck from "../middleware/authCheck";

export const router = express.Router();

router.get("/create-checkout-session", authCheck, createSession);

export default router;
