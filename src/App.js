import React, { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UseStateValue } from "./globalContext/StateProvider";
import Pusher from "pusher-js"

import Login from "./components/login/login";

function App() {

  //pusher-js for realtime synch with mongo DB
  useEffect(() => {   
    const pusher = new Pusher('945758d3b6566a1295a9', {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      alert(JSON.stringify(data));
    });
  }, [])

  const [{ user }, dispatch] = UseStateValue();

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
              <Route path="/">
                {/* <Chat /> */}
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
