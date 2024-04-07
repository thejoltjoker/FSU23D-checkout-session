import express from "express";
import { getServicePoints } from "../controllers/delivery.controller";

export const router = express.Router();

router.get("/service-points/:postalCode", getServicePoints);

export default router;
