import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import Authroutes from "./routes/AuthRoutes.js"
import MessageRoutes from "./routes/MessageRoutes.js"
import { Server } from "socket.io"

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())

app.use("/uploads/recordings", express.static("uploads/recordings"))
app.use("/uploads/images/", express.static("uploads/images"))

app.use('/api/auth', Authroutes)
app.use('/api/messages', MessageRoutes)

const server = app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})
const io = new Server(server, {
    cors: {
      origin:  "http:/localhost:3000"
    }
})

//to maintain online offline of users
global.onlineUsers = new Map()

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
    })
    socket.on("send-msg", (data)=> {
        const sendUserSocket = onlineUsers.get(data.id)
        if(sendUserSocket){ // if user is online
            socket.to(sendUserSocket).emit("message-recieve", {
                from: data.from,
                message: data.message
            })
        }
    })
})