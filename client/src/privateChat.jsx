import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
const socket = io(`http://localhost:3339/peronal-chat`,{auth : {token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiRW1haWwiOiJyb2hpdEBnbWFpbC5jb20iLCJGaXJzdE5hbWUiOiJSb2hpdCIsIkxhc3ROYW1lIjoiTW91cnlhIiwiTW9iaWxlTnVtYmVyIjoiOTc2ODUyNDUxMSIsImlhdCI6MTY2MDQ5Njg4MCwiZXhwIjoxNjYzMDg4ODgwfQ.8-LJMLmeCNeI4R7gwjERUtTTxjgqADtPlKN0sJGZbzA'}});

socket.on('connect_error', function (err) {
  console.log(`Error : ${err.message}`);
})

function PrivateChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [roomId ,setRoomId] = useState("1");
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("send-message", message,roomId);
    setMessage("");
    setChat(message)
  };
  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit("join_room", roomId);
  }
  useEffect(() => {
    
  }, [message]);

  return (
    <div className="PrivateChat">
      <header className="PrivateChat-header">
        <h1> Chat PrivateChat</h1>
        <p> {chat}</p>
        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="send chat"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></input>
          <button type="submit" onSubmit={sendChat}>Send</button><br></br>
          <input
            type="text"
            placeholder="set Room Id"
            value={roomId}
            onChange={(e) => {
              setRoomId(e.target.value);
              console.log(roomId);
            }}
          ></input>
          <button type="button" onClick={joinRoom}> Join Room </button>
        </form>
      </header>
    </div>
  );
}

export default PrivateChat;
