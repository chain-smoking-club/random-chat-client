import { useEffect, useState } from "react";
import { customEventNames } from "../service/customEventNames";
import { socket } from "../service/socket";

const ChatMessages = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on(
      customEventNames.receiveMessage,
      (receiveMessage: { content: string }) => {
        setMessages(messages.concat(receiveMessage.content));
      }
    );
    return () => {
      socket.off(customEventNames.receiveMessage);
    };
  }, [messages]);

  return (
    <>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </>
  );
};

export default ChatMessages;
