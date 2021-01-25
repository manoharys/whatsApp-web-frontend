import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticonIcon} from "@material-ui/icons";
import MoodIcon from '@material-ui/icons/Mood';
import MicNoneIcon from '@material-ui/icons/MicNone';
import React, { useState, useEffect } from "react";
import "./chat.css";
import db from "../firebase";
import {useParams} from "react-router-dom";


function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("123");
  const [roomName, setRoomName] = useState("");
  const {roomId} = useParams();

  const avatar = `https://avatars.dicebear.com/api/human/${seed}.svg`;

  useEffect(()=>{
    if(roomId){
        db.collection("rooms").doc(roomId).onSnapshot(snap=>(
            setRoomName(snap.data().name)
        ))
    }
  },[roomId])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const btnHandler = (e)=>{
      e.preventDefault();
      console.log(input);
      setInput("");
  }
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={avatar} />

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>last seen at ...</p>
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
         <p className="chat_message chat_reciever">
             <span className="chat_name">Manohar </span>
             Hey guys whats APP
             <span className="chat_timestamp">16:43 pm</span>
         </p>
      </div>

      {/* chat footer */}
      <div className="chat_footer">
         <MoodIcon />
         <form>
             <input type="text" placeholder="Type a message" value={input} onChange={(e)=>setInput(e.target.value)}/>
             <button type="submit" onClick={btnHandler}>Send</button>
         </form>
         <MicNoneIcon />
      </div>

    </div>
  );
}

export default Chat;
