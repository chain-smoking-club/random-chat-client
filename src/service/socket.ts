import io from "socket.io-client";
import { Message } from "./models";

if (typeof process.env.REACT_APP_WEB_SOCKET_BACKEND_URL !== "string") {
  throw new Error("no environment value : WEB_SOCKET_BACKEND_URL");
}

const customEventNames = {
  sendMessage: "SEND_MESSAGE",
  receiveMessage: "RECEIVE_MESSAGE",
} as const;

const socket = io(process.env.REACT_APP_WEB_SOCKET_BACKEND_URL, {
  transports: ["websocket"],
});

export const socketEvent = {
  emitSendMessage: (content: Message["content"]) =>
    socket.emit(customEventNames.sendMessage, { content }),
  onReceiveMessage: (callback: (content: Message["content"]) => void) =>
    socket.on(customEventNames.receiveMessage, (receiveMessage: Message) => {
      callback(receiveMessage.content);
    }),
  offReceiveMessage: () => {
    socket.off(customEventNames.receiveMessage);
  },
};
