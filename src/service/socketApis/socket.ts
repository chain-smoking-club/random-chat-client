import { io, Socket } from "socket.io-client";
import { Message, Room } from "../model/roomSchema";

if (typeof process.env.REACT_APP_WEB_SOCKET_BACKEND_URL !== "string") {
  throw new Error("no environment value : WEB_SOCKET_BACKEND_URL");
}

export interface ServerToClientEvents {
  receiveMessage: (receiveMessage: Message) => void;
}

export interface ClientToServerEvents {
  makeRoom: (req: Room) => void;
  joinRoom: (req: Room) => void;
  leaveRoom: (req: Room) => void;
  sendMessage: (req: Message) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  process.env.REACT_APP_WEB_SOCKET_BACKEND_URL,
  {
    transports: ["websocket"],
  }
);
