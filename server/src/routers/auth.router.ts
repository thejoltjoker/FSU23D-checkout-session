import express from "express";
import {
  authorize,
  login,
  logout,
  register,
} from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import { UserSchema } from "../schemas/UserSchema";

export const router = express.Router();

router.post("/login", validate(UserSchema), login);
router.post("/logout", logout);
router.post("/register", validate(UserSchema), register);
router.get("/authorize", authorize);

export default router;
