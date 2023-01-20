import { useEffect, useState } from "react";
import { onReceiveMessage } from "../service/apis";

const useMessages = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const concatMessages = (message: string) =>
    setMessages(messages.concat(message));

  useEffect(() => {
    const cleanUp = onReceiveMessage(concatMessages);
    return cleanUp;
  }, [messages]);

  return { messages };
};

export default useMessages;
