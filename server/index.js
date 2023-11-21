import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import Authroutes from "./routes/AuthRoutes"

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', Authroutes)

const server = app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})