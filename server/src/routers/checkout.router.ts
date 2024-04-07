import express from "express";
import { createSession, getSession } from "../controllers/checkout.controller";

export const router = express.Router();

// TODO add auth check
router.post("/session/create", createSession);
router.get("/session/:sessionId", getSession);

export default router;
