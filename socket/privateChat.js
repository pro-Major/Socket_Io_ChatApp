const { getUserDataFromToken } = require("../utils/getUserNameFromToken");
const models = require("../models");

module.exports = (io) => {
    const privateChat = io.of('/peronal-chat');
    //On the Socket server connection
    privateChat.on("connection", (socket) => {
      console.log(`private chat socket connected`, socket.id);

      privateChat.use(async (socket,next)=>{
        if(socket.handshake.auth.token){
            const userData = await getUserDataFromToken(socket.handshake.auth.token)
            socket.userEmail = userData.email;
            socket.userName = userData.firstName + ' ' + userData.lastName;
            socket.userId = userData.id;
            socket.mobileNumber = userData.mobileNumber;
            next();
        }else{
            next(new Error('Invalid token')); 
        }
      })
      socket.on("join_room",async (room) => {
        console.log(room);
        const conversationId = await models.conversation.findOne({where : {conversationId : room}})
        // let conversationId = true;
        if(conversationId){
            console.log(`inside working`)
            socket.join(room);
            socket.to(room).emit("message",`User  ${socket.userName} joined`);
        }
      })
      socket.on("send-message", async (message,room) => {
        await models.message.create({from : socket.userId , message , ConversationId : room })
        socket.to(room).emit("message",message);
      })
      socket.on("disconnect", () => {
        console.log("socket disconnected");
      });
    });
  };
  