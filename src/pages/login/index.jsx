import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Typography } from "@mui/material";

import "./style.css";

const Login = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = () => {
    setRoomId(uuidV4());
    toast.success("Created a new room!");
  };

  const joinRoom = () => {
    if (!roomId || !username)
      return toast.error("ROOM ID & username is required!");
    navigate(`/editor/${roomId}`, { state: { username } });
  };

  return (
    <>
      <div className="Login_homePageWrapper">
        <div className="Login_formWrapper">
          <img
            className="Login_homePageLogo"
            src="/image/logo/logo-transparent.png"
            alt="code-sync-logo"
          />
          <Typography variant="h6" sx={{ mt: 0, mb: 2 }}>
            Invitation ID
          </Typography>

          <div className="Login_inputGroup">
            <input
              type="text"
              className="Login_inputBox"
              placeholder="ROOM ID"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              onKeyUp={(e) => e.code === "Enter" && joinRoom()}
            />
            <input
              type="text"
              className="Login_inputBox"
              placeholder="USERNAME"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyUp={(e) => e.code === "Enter" && joinRoom()}
            />
            <button className="btn Login_joinBtn" onClick={joinRoom}>
              <LoginIcon sx={{ height: "1rem" }} /> Join
            </button>
            <span className="Login_createInfo">
              don't have an invite ? &nbsp;
              <a
                onClick={(e) => {
                  e.preventDefault();
                  createNewRoom();
                }}
                href="/"
                className="Login_createNewBtn"
              >
                Create new
              </a>
            </span>
          </div>
        </div>
        <footer className="Login_footer">
          <h4>
            Created by <GitHubIcon />{" "}
            <a href="https://github.com/lexuscreations/">@LexusCreations</a>
          </h4>
        </footer>
      </div>
    </>
  );
};

export default Login;
