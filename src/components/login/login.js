import React from "react";
import { Button } from "@material-ui/core";
import "./login.css";
import { auth, provider } from "../../firebase";

function login() {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => console.log(result))
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
          alt="whatsAPP"
        />
        <div className="login_text">
          <h6>Sign in to WhatsApp</h6>
        </div>

        <Button onClick={signIn}>Sign with Google</Button>
      </div>
    </div>
  );
}

export default login;
