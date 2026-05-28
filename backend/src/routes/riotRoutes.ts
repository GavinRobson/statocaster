import express from "express"
import { getRiotAccountByUsernameTag } from "../controllers/riotController"

const router = express.Router()

router.get("/:username/:tag", getRiotAccountByUsernameTag)

export default router
