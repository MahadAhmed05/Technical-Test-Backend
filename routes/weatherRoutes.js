// routes/weatherRoutes.js

import express from "express";
import { getWeatherDecision } from "../controllers/weatherController.js";

const router = express.Router();

router.get("/", getWeatherDecision);

export default router;
