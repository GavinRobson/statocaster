import express from "express";
import { getValorantAccountById } from "../controllers/valorantController"

const router = express.Router();

// Define routes here
router.get("/account/:username/:tag", getValorantAccountById)

export default router;
