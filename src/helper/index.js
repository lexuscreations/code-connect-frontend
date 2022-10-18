import { initSocket } from "./socket";
import { localStorageHandler } from "./localStorageHelper.js";
import toast from "react-hot-toast";

const copyToClipBoard = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
    toast.success("Room ID has been copied to your clipboard");
  } catch (err) {
    toast.error("Could not copy the Room ID");
    console.error(err);
  }
};

export { initSocket, localStorageHandler, copyToClipBoard };
