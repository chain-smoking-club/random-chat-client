import { io, Socket } from "socket.io-client";
import { GetRoomsResponse, Message } from "./models";

if (typeof process.env.REACT_APP_WEB_SOCKET_BACKEND_URL !== "string") {
  throw new Error("no environment value : WEB_SOCKET_BACKEND_URL");
}

interface ServerToClientEvents {
  receiveMessage: (receiveMessage: Message) => void;
}

interface ClientToServerEvents {
  createRoom: (roomName: string) => void;
  joinRoom: (roomName: string) => void;
  sendMessage: (message: Message) => void;
  leaveRoom: () => void;
  getRooms: (callback: (res: GetRoomsResponse) => void) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  process.env.REACT_APP_WEB_SOCKET_BACKEND_URL,
  {
    transports: ["websocket"],
  }
);
