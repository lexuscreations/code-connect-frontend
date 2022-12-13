import { io } from "socket.io-client";
import { initSocketOptions } from "../config";

export const initSocket = async () =>
  io(
    process.env.REACT_APP_BACKEND_URL ||
      "https://lexus-codeconnect.onrender.com",
    initSocketOptions
  );
