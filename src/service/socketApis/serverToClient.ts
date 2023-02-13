import { io, Socket } from "socket.io-client";
import { storage } from "../../storage";
import { Message } from "../model/roomSchema";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  setSocketAuth,
  socket,
} from "./socket";

export const onReceiveMessage = (
  callback: (content: Message["content"]) => void
) => {
  setSocketAuth();
  socket.on("receiveMessage", (receiveMessage: Message) => {
    console.log(receiveMessage);
    callback(receiveMessage.content);
  });
  return () => {
    socket.off("receiveMessage");
  };
};

const getSocket = () => {
  if (typeof import.meta.env.VITE_WEB_SOCKET_BACKEND_URL !== "string") {
    throw new Error("no environment value : WEB_SOCKET_BACKEND_URL");
  }

  if (!storage.get("ACCESS_TOKEN")) throw new Error("no access token");

  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    import.meta.env.VITE_WEB_SOCKET_BACKEND_URL,
    {
      transports: ["websocket"],
      auth: {
        token: storage.get("ACCESS_TOKEN"),
      },
    }
  );
  return socket;
};
