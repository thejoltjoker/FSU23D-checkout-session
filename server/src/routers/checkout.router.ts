import express from "express";
import { createSession, getSession } from "../controllers/checkout.controller";
import authCheck from "../middleware/authCheck";

export const router = express.Router();

router.post("/session/create", authCheck, createSession);
router.get("/session/:sessionId", authCheck, getSession);

export default router;
