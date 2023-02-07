import {
  EmitJoinRoomProps,
  EmitLeaveRoomProps,
  EmitMakeRoomProps,
  EmitSendMessageProps,
} from "../model/roomSchema";
import { socket } from "./socket";

export const emitSendMessage = async (props: EmitSendMessageProps) =>
  socket.emit("sendMessage", props);

export const emitMakeRoom = async (props: EmitMakeRoomProps) =>
  socket.emit("makeRoom", props);

export const emitJoinRoom = async (props: EmitJoinRoomProps) =>
  socket.emit("joinRoom", props);

export const emitLeaveRoom = async (props: EmitLeaveRoomProps) =>
  socket.emit("leaveRoom", props);