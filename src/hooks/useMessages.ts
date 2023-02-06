import { useEffect, useState } from "react";
import { onReceiveMessage } from "../service/apis/socketServerToClient";

const useMessages = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const concatMessages = (message: string) =>
      setMessages(messages.concat(message));

    const cleanUp = onReceiveMessage(concatMessages);
    return cleanUp;
  }, [messages]);

  return { messages };
};

export default useMessages;
