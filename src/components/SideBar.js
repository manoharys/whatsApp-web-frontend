import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Pusher from "pusher-js";
import "./sidebar.css";
import SideBarChat from "./SideBarChat";
import { useSelector, useDispatch } from "react-redux";
import { getRooms, updateRoomData } from "../redux/messages/messages-actions";

const SideBar = () => {
  const [rooms, setRooms] = useState();

  const user = useSelector((state) => state.rooms.user);
  const roomsData = useSelector((state) => state.rooms.rooms);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms());
  }, [roomsData, rooms]);

  useEffect(() => {
    setRooms(roomsData);
  }, [roomsData, rooms, setRooms]);

  //pusher-js for realtime synch with mongo DB
  useEffect(() => {
    const pusher = new Pusher("945758d3b6566a1295a9", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      dispatch(updateRoomData(data));
    });

    return () => {
      channel.unsubscribe();
      channel.unbind();
    };
  }, [roomsData]);

  useEffect(() => {
    const pusher = new Pusher("945758d3b6566a1295a9", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("message");
    channel.bind("updated", (data) => {
      dispatch(getRooms());
    });

    return () => {
      channel.unsubscribe();
      channel.unbind();
    };
  }, [roomsData]);

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
        {rooms &&
          rooms.map((room) => <SideBarChat key={room.id} room={room} />)}
      </div>
    </div>
  );
};

export default SideBar;
