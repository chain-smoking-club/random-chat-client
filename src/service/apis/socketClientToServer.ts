import { Message } from "../models";
import { socket } from "../socket";

export const sendMessage = async (args: {
  content: Message["content"];
  roomName: string;
}) => socket.emit("sendMessage", args);

export const makeRoom = async (args: { roomName: string }) =>
  socket.emit("makeRoom", args);

export const joinRoom = async (args: { roomName: string }) =>
  socket.emit("joinRoom", args);

export const leaveRoom = async (args: { roomName: string }) =>
  socket.emit("leaveRoom", args);
