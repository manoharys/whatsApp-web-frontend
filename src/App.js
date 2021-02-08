import React, { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UseStateValue } from "./globalContext/StateProvider";
import Login from "./components/login/Login";
import { getRooms, updateRoomData } from "./redux/messages/messages-actions";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.rooms.user);
  const rooms = useSelector((state) => state.rooms.rooms);



  return (
    <div className="App">
      {!user ? (
        <h1>
          <Login />
        </h1>
      ) : (
        <div className="app_body">
          <Router>
            <SideBar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">{/* <Chat /> */}</Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
