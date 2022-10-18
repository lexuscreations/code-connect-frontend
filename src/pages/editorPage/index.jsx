import toast from "react-hot-toast";
import React, { useState, useRef, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";

import "./style.css";
import Client from "../../components/client/";
import Editor from "../../components/editor/";
import StatusBar from "../../components/statusBar/";
import {
  socketActions,
  localStorageKey,
  defaultThemeAndLanguage,
} from "../../constraints";
import {
  initSocket,
  localStorageHandler,
  copyToClipBoard,
} from "../../helper/";

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();

  const [code, setCode] = useState("");
  const [clients, setClients] = useState([]);

  const [theme, setTheme] = useState(defaultThemeAndLanguage.theme);
  const [language, setLanguage] = useState(defaultThemeAndLanguage.language);

  const setThemeHandler = (newTheme) => {
    localStorageHandler.set({ key: localStorageKey.theme, newVal: newTheme });
    setTheme(newTheme);
  };

  const setLanguageHandler = (newLanguage) => {
    localStorageHandler.set({
      key: localStorageKey.language,
      newVal: newLanguage,
    });
    setLanguage(newLanguage);
  };

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
          username !== location.state?.username &&
            toast.success(`${username} joined the room.`);
          setClients(clients);
          socketRef.current.emit(socketActions.SYNC_CODE, { code, socketId });
        }
      );

      socketRef.current.on(
        socketActions.DISCONNECTED,
        ({ socketId, username }) => {
          toast.success(`${username} left the room.`);
          setClients((prev) =>
            prev.filter((client) => client.socketId !== socketId)
          );
        }
      );
    };
    init();

    setTheme(
      localStorageHandler.get({ key: localStorageKey.theme }) ||
        defaultThemeAndLanguage.theme
    );
    setLanguage(
      localStorageHandler.get({ key: localStorageKey.language }) ||
        defaultThemeAndLanguage.language
    );

    const LS_pre_save_code = localStorageHandler.get({
      key: localStorageKey.code,
    });
    setCode(LS_pre_save_code);

    return () => {
      if (!socketRef.current) return;
      socketRef.current.disconnect();
      socketRef.current.off(socketActions.JOINED);
      socketRef.current.off(socketActions.DISCONNECTED);
    };
  }, []);

  const copyRoomId = async () => await copyToClipBoard(roomId);

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
        <StatusBar
          theme={theme}
          setThemeHandler={setThemeHandler}
          language={language}
          setLanguageHandler={setLanguageHandler}
        />
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          theme={theme}
          language={language}
          code={code}
          setCode={setCode}
        />
      </div>
    </div>
  );
};

export default EditorPage;
