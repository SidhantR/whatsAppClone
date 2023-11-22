import { Router } from "express"
import { checkUser } from "../controllers/AuthController.js"

const router = Router()

router.post('/checkUser', checkUser)

export default router