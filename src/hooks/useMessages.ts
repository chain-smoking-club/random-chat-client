import { useEffect, useState } from "react";
import { onReceiveMessage } from "../service/socketApis/serverToClient";

export default function useMessages() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const concatMessages = (message: string) =>
      setMessages(messages.concat(message));

    const cleanUp = onReceiveMessage(concatMessages);
    return cleanUp;
  }, [messages]);

  return { messages };
}
