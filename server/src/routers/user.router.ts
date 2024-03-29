import express from "express";
import { get } from "../controllers/user.controller";
export const router = express.Router();

router.get("/", get);

export default router;
