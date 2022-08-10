
module.exports = (io) => {

//On the Socket server connection
io.on("connection", (socket) => {
    console.log(`socket connected`)
    socket.on("chat", (payload) => {
      io.emit("chat", payload);
      console.log(payload);
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });
  });
}