import { io, Socket } from "socket.io-client";
import { Message, Room } from "../model/roomSchema";

if (typeof import.meta.env.VITE_WEB_SOCKET_BACKEND_URL !== "string") {
  throw new Error("no environment value : WEB_SOCKET_BACKEND_URL");
}

export interface ServerToClientEvents {
  receiveMessage: (receiveMessage: Message) => void;
}

export interface ClientToServerEvents {
  makeRoom: (req: Room, callback: (response: any) => void) => void;
  joinRoom: (req: Room, callback: (response: any) => void) => void;
  leaveRoom: (req: Room, callback: (response: any) => void) => void;
  sendMessage: (req: Message, callback: (response: any) => void) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  import.meta.env.VITE_WEB_SOCKET_BACKEND_URL,
  {
    transports: ["websocket"],
  }
);
