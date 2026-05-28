import express from "express";
import { getValorantAccount } from "../controllers/valorantController"

const router = express.Router();

// Define routes here
router.get("/account/:username/:tag", getValorantAccount)

export default router;
