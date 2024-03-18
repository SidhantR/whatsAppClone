import { Router } from "express"
import { checkUser, onBoarduser } from "../controllers/AuthController.js"

const router = Router()

router.post('/checkUser', checkUser)
router.post('/onboard-user', onBoarduser)

export default router