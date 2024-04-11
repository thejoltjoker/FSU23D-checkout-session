import express from "express";
import { getServicePoints } from "../controllers/shipping.controller";

export const router = express.Router();

router.get("/service-points/:postalCode", getServicePoints);

export default router;
