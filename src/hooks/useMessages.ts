import { useState } from "react";

const useMessages = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const concatMessages = (message: string) =>
    setMessages(messages.concat(message));

  return { messages, concatMessages };
};

export default useMessages;
