const models = require("../models");
module.exports = (io) => {
  //On the Socket server connection
  io.on("connection", (socket) => {
    console.log(`socket connected`, socket.id);
    
    socket.on("join", (data) => {
          socket.join(data.email); 
          // io.to(data.email).emit('chat', {message: `hello ${socket.id}`});
    })
    socket.on("group_chat", (data) => {
      socket.broadcast.emit("message", data);
    })




    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });
  });
};




// socket.on("chat", (payload) => {
//   socket.broadcast.emit("message", payload);
//   console.log(payload);
// });
// // socket.on("group_chat", async (payload, room) => {
// //   const ConversationId = await models.conversation.findOne({where :{ConversationId : room}});
// //   if(ConversationId){
// //   if (room === "") {
// //     socket.broadcast.emit("message", payload);
// //   } else {
// //     socket.to(room).emit("message", payload);
// //   }
// //   }
// // });
// socket.on("login", ({name, room}, callback) => {
  
// })
// socket.on("sendMessage", message => {

// })
// socket.on("join-room", ({name, room}, callback) => {
//   socket.join(room);
//   callback(`Joined ${room}`);
//   console.log(`Joined ${room}`);
// })