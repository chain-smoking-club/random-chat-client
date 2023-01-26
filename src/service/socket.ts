import { io, Socket } from "socket.io-client";
import { GetRoomsResponse, Message, Room } from "./models";

if (typeof process.env.REACT_APP_WEB_SOCKET_BACKEND_URL !== "string") {
  throw new Error("no environment value : WEB_SOCKET_BACKEND_URL");
}

interface ServerToClientEvents {
  receiveMessage: (receiveMessage: Message) => void;
  getRooms: (res: GetRoomsResponse) => void;
}

interface ClientToServerEvents {
  getRooms: (callback: (res: GetRoomsResponse) => void) => void;
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
