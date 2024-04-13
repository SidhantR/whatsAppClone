import getPrismaInstance from "../utils/PrismaClient.js"

export const addMessage = async (req,res,next) => {
    try{
        const prisma = getPrismaInstance();
        const {message, from, to} = req.body;
        const getUser = onlineUsers.get(to);
        console.log(getUser)
        if(message && from && to){
            const newMessage = await prisma.messages.create({
                data: {
                    message,
                    sender: {connect: {id : parseInt(from)}},
                    reciever: {connect: {id: parseInt(to)}},
                    messageStatus : getUser ? "delivered": "sent"

                },
                include: { sender: true , reciever: true }
            })
            return res.status(201).send({ message: newMessage })
        }
        return res.status(400).send({message:"From, to and Message is required"})
    } catch(err) {
        console.log('err', err)
        next(err)
    }
}

export const getMessages = async (req,res,next) => {
    try{
        const prisma = getPrismaInstance()
        const {from, to} = req.params
        const messages = await prisma.messages.findMany({
            where: {
                OR: [
                    {
                        senderId: parseInt(from),
                        recieverId: parseInt(to)
                    },
                    {
                        senderId: parseInt(to),
                        recieverId: parseInt(from)
                    },
                ]
            },
            orderBy: {
                id: "asc",
            }
        })
        const unreadMessages = []
        messages.forEach((message, index) => {
            if(message.messageStatus !== "read" && message.senderId === parseInt(to)){
                messages[index].messageStatus = "read";
                unreadMessages.push(message.id)
            }
        })
        await prisma.messages.updateMany({
            where: {
                id: {in: unreadMessages}
            }, data : {
                messageStatus: "read"
            }
        })

        res.status(200).json({messages})
    } catch(err) {
        next(err)
    }
}