import express from "express";
import { get } from "../controllers/user.controller";
import authCheck from "../middleware/authCheck";
import {
  login,
  logout,
  register,
  authorize,
} from "../controllers/auth.controller";
import authRouter from "./auth.router";
export const router = express.Router();

router.get("/", authCheck, get);
router.use("/", authRouter);

export default router;
