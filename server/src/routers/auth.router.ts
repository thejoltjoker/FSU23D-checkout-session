import express from "express";
import {
  authorize,
  login,
  logout,
  register,
} from "../controllers/auth.controller";

export const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.get("/authorize", authorize);

export default router;
