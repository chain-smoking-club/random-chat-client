import { Message } from "./models";
import { socket } from "./socket";

export const sendMessage = (content: Message["content"]) => {
  socket.emit("sendMessage", { content });
};

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
