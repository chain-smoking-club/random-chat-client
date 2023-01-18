import { useEffect, useState } from "react";
import io from "socket.io-client";
import { customEventNames } from "./service/customEventNames";

if (typeof process.env.REACT_APP_WEB_SOCKET_BACKEND_URL !== "string") {
  throw new Error("no environment value : WEB_SOCKET_BACKEND_URL");
}

const socket = io(process.env.REACT_APP_WEB_SOCKET_BACKEND_URL, {
  transports: ["websocket"],
});

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [typingMessage, setTypingMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typingMessage) {
      socket.emit(customEventNames.sendMessage, { content: typingMessage });
      setTypingMessage("");
    }
  };

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
      <form onSubmit={handleSubmit}>
        <input
          value={typingMessage}
          onChange={(e) => setTypingMessage(e.target.value)}
        />
        <button>submit</button>
      </form>
    </>
  );
}

export default App;
