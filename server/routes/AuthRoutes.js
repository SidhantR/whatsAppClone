import { Router } from "express"
import { checkUser } from "../controllers/AuthController"

const router = Router()

router.post('/checkUser', checkUser)

export default router