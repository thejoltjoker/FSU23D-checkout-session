import express from "express";
import { sendEmailConfirmation } from "../controllers/email.controller";
import authCheck from "../middleware/authCheck";

export const router = express.Router();

router.post("/send", authCheck, sendEmailConfirmation);

export default router;
