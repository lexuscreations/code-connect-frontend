import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

import "./style.css";
import { initSocket } from "../../helper/";
import Client from "../../components/client/";
import Editor from "../../components/Editor";
import { socketActions } from "../../constraints";

const EditorPage = () => {
  const codeRef = useRef(null);
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  const handleErrors = (e) => {
    console.log("socket error", e);
    toast.error("Socket connection failed, try again later.");
    reactNavigator("/");
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      socketRef.current.emit(socketActions.JOIN, {
        roomId,
        username: location.state?.username,
      });

      socketRef.current.on(
        socketActions.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          setClients(clients);
          socketRef.current.emit(socketActions.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      socketRef.current.on(
        socketActions.DISCONNECTED,
        ({ socketId, username }) => {
          toast.success(`${username} left the room.`);
          setClients((prev) => {
            return prev.filter((client) => client.socketId !== socketId);
          });
        }
      );
    };
    init();
    return () => {
      if (!socketRef.current) return;
      socketRef.current.disconnect();
      socketRef.current.off(socketActions.JOINED);
      socketRef.current.off(socketActions.DISCONNECTED);
    };
  }, []);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  };

  if (!location.state) return <Navigate to="/" />;

  return (
    <div className="EditorPage_mainWrap">
      <div className="EditorPage_aside">
        <div className="EditorPage_asideInner">
          <div className="EditorPage_logo">
            <img
              className="EditorPage_logoImage"
              src="/image/logo/logo-transparent.png"
              alt="logo"
            />
          </div>
          <h3>Connected</h3>
          <div className="EditorPage_clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={copyRoomId}>
          Copy ROOM ID
        </button>
        <button
          className="btn EditorPage_leaveBtn"
          onClick={() => reactNavigator("/")}
        >
          Leave
        </button>
      </div>
      <div className="EditorPage_editorWrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
