import React, { useState, useEffect } from "react";
import db from "../firebase";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import "./sidebar.css";
import SideBarChat from "./SideBarChat";
import { useSelector, useDispatch } from "react-redux";

const SideBar = () => {
  const [rooms, setRooms] = useState([]);
  const user = useSelector((state) => state.rooms.user);
  const roomsData = useSelector((state) => state.rooms.rooms);
  const dispatch = useDispatch();

 
  // useEffect(() => {
  //   db.collection("rooms").onSnapshot((onSnap) =>
  //     setRooms(
  //       onSnap.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     )
  //   );
  // }, []);

  return (
    <div className="sideBar">
      <div className="sideBar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sideBar_search">
        <div className="searchBar_container">
          <SearchIcon />
          <input type="text" placeholder="Search or start new" />
        </div>
      </div>
      <div className="sideBar_chat">
        <SideBarChat addNewChat={"hello"} />

        {/* {rooms && rooms.map((room) => (
          <SideBarChat key={room.id} name={room.name} id={room.id} />
        ))} */}
      </div>
    </div>
  );
};

export default SideBar;
