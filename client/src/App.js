import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
const socket = io(`http://localhost:3339`);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message });
    setMessage("");
    setChat(message)
  };
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
          <button type="submit" onSubmit={sendChat}>Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
