import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import PrivateChat from "./privateChat";
const socket = io(`http://localhost:3339`);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [roomId ,setRoomId] = useState("1");
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("group_chat", message);
    setMessage("");
    setChat(message)
  };
  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit("join_room", {message,roomId});
  }
  useEffect(() => {
    
  }, [message]);

  return (
    <div className="App">
      <header className="App-header">
        <h1> Chat App</h1>
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
        <div>
        <PrivateChat/>
        </div> 
      </header>

    </div>
  );
}

export default App;
