import { Message } from "../model/roomSchema";
import { socket } from "./socket";

export const onReceiveMessage = (
  callback: (content: Message["content"]) => void
) => {
  socket.on("receiveMessage", (receiveMessage: Message) => {
    callback(receiveMessage.content);
  });
  return () => {
    socket.off("receiveMessage");
  };
};