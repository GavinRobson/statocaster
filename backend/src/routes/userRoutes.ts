import express from "express";
import { getUsers, createUser, getUserById, getUserByUsernameTag } from "../controllers/userController";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUserById)
router.get("/:username/:tag", getUserByUsernameTag)

export default router;
