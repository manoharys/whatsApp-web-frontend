import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./sideBarChat.css";
import db from "../firebase";
import { Link } from "react-router-dom";
import { addRooms } from "../api/api";

const SideBarChat = ({ addNewChat, room }) => {
  const [messages, setMessages] = useState("");
  const [seed, setSeed] = useState("123");
  const avatar = `https://avatars.dicebear.com/api/human/${seed}.svg`;

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      //data base stuff
      const data = {
        name: roomName,
        roomMessages: {
          name: "",
          message: "",
        },
      };
      addRooms(data);
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${room._id}`}>
      <div className="sidebarChat">
        <Avatar src={avatar} />
        <div className="sidebarChat_info">
          <h3
            style={{
              fontSize: "18px",
              color: "rgb(69 66 66)",
            }}
          >
            {room.name}
          </h3>
          <p
            style={{
              fontSize: "13px",
              marginLeft: "6px",
              marginTop: "4px",
              color: "#3a3838",
            }}
          >
            {room.roomMessages[0].message != undefined
              ? room.roomMessages[0]?.message +   ".."
              : "..."}
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2
        style={{
          fontSize: "20px",
          color: "rgb(69 66 66)",
          textAlign: "center",
          flex: 1,
        }}
      >
        Add new Chat
      </h2>
    </div>
  );
};

export default SideBarChat;
