export const toastOptions = {
  success: {
    theme: {
      primary: "#4aed88",
    },
  },
};

export const initSocketOptions = {
  "force new connection": true,
  reconnectionAttempt: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};
