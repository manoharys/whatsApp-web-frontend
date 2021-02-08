import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  SearchOutlined,
  MoreVert,
  InsertEmoticonIcon,
} from "@material-ui/icons";
import MoodIcon from "@material-ui/icons/Mood";
import MicNoneIcon from "@material-ui/icons/MicNone";
import React, { useState, useEffect } from "react";
import "./chat.css";
import { useParams } from "react-router-dom";
import { getSingleRoom } from "../api/api";
import { useSelector } from "react-redux";

function Chat() {
  const user = useSelector((state) => state.rooms.user);
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("123");
  const [roomName, setRoomName] = useState("");
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);

  console.log(roomId);

  const avatar = `https://avatars.dicebear.com/api/human/${seed}.svg`;

  const room = async () => {
    const { data } = await getSingleRoom(roomId);
    console.log("Roomdata", data);
    setRoomName(data.name);
    setMessages(data.roomMessages);
  };
  useEffect(() => {
    if (roomId) {
      room();
    }
  }, [roomId]);

  console.log("roomName ", roomName);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const btnHandler = (e) => {
    e.preventDefault();
    //console.log(input);
    // db.collection("rooms").doc(roomId).collection("messages").add({
    //   message: input,
    //   name: user.displayName,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // });

    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={avatar} />

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>last seen at {new Date(messages[0].date).toLocaleTimeString()}</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {/* chat body */}
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_reciever"
            }`}
          >
            <span className="chat_name">{message.name} </span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(messages[0].date).toLocaleTimeString()}
            </span>
          </p>
        ))}
      </div>

      {/* chat footer */}
      <div className="chat_footer">
        <MoodIcon />
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={btnHandler}>
            Send
          </button>
        </form>
        <MicNoneIcon />
      </div>
    </div>
  );
}

export default Chat;
