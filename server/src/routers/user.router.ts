import express from "express";
import { get } from "../controllers/user.controller";
import authCheck from "../middleware/authCheck";
export const router = express.Router();

router.get("/", authCheck, get);

export default router;
