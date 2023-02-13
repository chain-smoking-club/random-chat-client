import {
  EmitJoinRoomProps,
  EmitLeaveRoomProps,
  EmitMakeRoomProps,
  EmitSendMessageProps,
} from "../model/roomSchema";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  setSocketAuth,
  socket,
} from "./socket";

export const emitSendMessage = async (props: EmitSendMessageProps) => {
  setSocketAuth();
  return socket.emit("sendMessage", props, (response) => {
    console.log(response);
  });
};

export const emitMakeRoom = async (props: EmitMakeRoomProps) => {
  setSocketAuth();
  return socket.emit("makeRoom", props, (response) => {
    console.log(response);
  });
};

export const emitJoinRoom = async (props: EmitJoinRoomProps) => {
  setSocketAuth();
  return socket.emit("joinRoom", props, (response) => {
    console.log(response);
  });
};

export const emitLeaveRoom = async (props: EmitLeaveRoomProps) => {
  setSocketAuth();
  return socket.emit("leaveRoom", props, (response) => {
    console.log(response);
  });
};
