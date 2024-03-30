import { Router } from "express"
import { checkUser, getAllUsers, onBoarduser } from "../controllers/AuthController.js"

const router = Router()

router.post('/checkUser', checkUser)
router.post('/onboard-user', onBoarduser)
router.get('/get-contacts', getAllUsers)

export default router