import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Authroutes from "./routes/AuthRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads/recordings", express.static("uploads/recordings"));
app.use("/uploads/images/", express.static("uploads/images"));

app.use("/api/auth", Authroutes);
app.use("/api/messages", MessageRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
const io = new Server(server, {
  cors: {
    origin: "http:/localhost:3000",
  },
});

//to maintain online offline of users
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.id);
    if (sendUserSocket) {
      // if user is online
      socket.to(sendUserSocket).emit("message-recieve", {
        from: data.from,
        message: data.message,
      });
    }
  });

  socket.on("outgoing-voice-call", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("incoming-voice-call", {
        from: data.from,
        roomId: data.roomId,
        callType: data.callType,
      });
    }
  });

  socket.on("outgoing-video-call", (data) => {
    const sendUserSocket = onlineUsers.get(data.to)
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("incoming-video-call", {
            from: data.from,
            callType: data.callType,
            roomId: data.roomId
        })
    }
  })

  socket.on("reject-voice-call", (data) => {
    const sendUserSocket = onlineUsers.get(data.from)
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("voice-call-rejected")
    }
  })

  socket.on("reject-video-call", (data) => {
    const sendUserSocket = onlineUsers.get(data.from)
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("video-call-rejected")
    }
  })

  socket.on("accept-incoming-call", ({id})=> {
    const sendUserSocket = onlineUsers.get(id)
    socket.to(sendUserSocket).emit("accept-call")
  })
});
