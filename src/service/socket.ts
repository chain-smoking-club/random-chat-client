import io from "socket.io-client";

if (typeof process.env.REACT_APP_WEB_SOCKET_BACKEND_URL !== "string") {
  throw new Error("no environment value : WEB_SOCKET_BACKEND_URL");
}

export const socket = io(process.env.REACT_APP_WEB_SOCKET_BACKEND_URL, {
  transports: ["websocket"],
});
