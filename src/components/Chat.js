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
import { getSingleRoom, addMessage } from "../api/api";
import { useSelector } from "react-redux";

function Chat() {
  const user = useSelector((state) => state.rooms.user);
  const roomsData = useSelector((state) => state.rooms.rooms);
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("123");
  const [roomName, setRoomName] = useState("");
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);

  const avatar = `https://avatars.dicebear.com/api/human/${seed}.svg`;

  const room = async () => {
    try {
      const { data } = await getSingleRoom(roomId);
      setRoomName(data.name);
      setMessages(data.roomMessages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (roomId) {
      room();
    }
  }, [roomsData]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const btnHandler = (e) => {
    e.preventDefault();
    const data = {
      id: roomId,
      name: user.displayName,
      message: input,
    };

    addMessage(data);

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={avatar} />

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>

          <p>last seen at {new Date().toLocaleTimeString()}</p>
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
            key={message.id}
            className={`chat_message ${
              message.name === user.displayName && "chat_reciever"
            }`}
          >
            <span className="chat_name">{message.name} </span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.date).toLocaleTimeString()}
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
