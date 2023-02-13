import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { handleError } from "../error";
import {
  EmitJoinRoomProps,
  EmitLeaveRoomProps,
  EmitMakeRoomProps,
  EmitSendMessageProps,
} from "../service/model/roomSchema";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../service/socketApis/socket";
import { storage } from "../storage";
import { SocketContextProps } from "../types/socket";

const SocketContext = createContext<SocketContextProps>(null!);

export function SocketProvider({ children }: { children: ReactNode }) {
  const navigator = useNavigate();
  const { roomId: joinedRoomName } = useParams();
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>();

  const connectSocket = () => {
    const token = storage.get("ACCESS_TOKEN");

    if (!token) handleError(new Error("no access token"));

    setSocket(
      io(import.meta.env.VITE_WEB_SOCKET_BACKEND_URL, {
        transports: ["websocket"],
        auth: {
          token: `Bearer ${token}`,
        },
      })
    );
  };

  const makeRoom = (props: EmitMakeRoomProps) => {
    try {
      if (!socket) throw new Error("no socket");
      console.log("make");
      socket.emit("makeRoom", props, (response) => {
        console.log(response);
      });
      socket.emit("joinRoom", props, (response) => {
        console.log(response);
      });
      navigator(`/room/${props.roomName}`);
    } catch (err) {
      handleError(err);
    }
  };

  const joinRoom = (props: EmitJoinRoomProps) => {
    try {
      if (!socket) throw new Error("no socket");

      console.log("make");
      socket.emit("joinRoom", props, (response) => {
        console.log(response);
      });
      navigator(`/room/${props.roomName}`);
    } catch (err) {
      handleError(err);
    }
  };

  const leaveRoom = (props: EmitLeaveRoomProps) => {
    try {
      if (!socket) throw new Error("no socket");

      socket.emit("leaveRoom", props, (response) => {
        console.log(response);
      });
      navigator(`/lobby`);
    } catch (err) {
      handleError(err);
    }
  };

  const sendMessage = (props: EmitSendMessageProps) => {
    try {
      if (!socket) throw new Error("no socket");

      socket.emit("sendMessage", props, (response) => {
        console.log(response);
      });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        joinedRoomName,
        connectSocket,
        makeRoom,
        joinRoom,
        leaveRoom,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
