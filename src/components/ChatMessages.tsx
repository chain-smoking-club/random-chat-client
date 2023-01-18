import { useEffect } from "react";
import useMessages from "../hooks/useMessages";
import { socketEvent } from "../service/socket";

const ChatMessages = () => {
  const { messages, concatMessages } = useMessages();

  useEffect(() => {
    socketEvent.onReceiveMessage(concatMessages);
    return socketEvent.offReceiveMessage;
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
