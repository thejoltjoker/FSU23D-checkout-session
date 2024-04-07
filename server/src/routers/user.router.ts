import express from "express";
import { get } from "../controllers/user.controller";
import authCheck from "../middleware/authCheck";
import authRouter from "./auth.router";
export const router = express.Router();

// TODO get user information
// TODO set user information, such as address and customer id
router.get("/", authCheck, get);
router.use("/", authRouter);

export default router;
