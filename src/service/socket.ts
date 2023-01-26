import { io, Socket } from "socket.io-client";
import { EventResponse, Message, Room } from "./models";

if (typeof process.env.REACT_APP_WEB_SOCKET_BACKEND_URL !== "string") {
  throw new Error("no environment value : WEB_SOCKET_BACKEND_URL");
}

export interface ServerToClientEvents {
  makeRoomResponse: (res: EventResponse) => void;
  joinRoomResponse: (res: EventResponse) => void;
  leaveRoomResponse: (res: EventResponse) => void;
  sendMessageResponse: (res: EventResponse) => void;
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
