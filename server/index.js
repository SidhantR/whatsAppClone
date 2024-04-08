import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import Authroutes from "./routes/AuthRoutes.js"
import MessageRoutes from "./routes/MessageRoutes.js"

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', Authroutes)
app.use('/api/messages', MessageRoutes)

const server = app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})

//to maintain online offline of users
global.onlineUsers = new Map()