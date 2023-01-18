import { useState } from "react";
import { customEventNames } from "../service/customEventNames";
import { socket } from "../service/socket";

const ChatInputBox = () => {
  const [typingMessage, setTypingMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typingMessage) {
      socket.emit(customEventNames.sendMessage, { content: typingMessage });
      setTypingMessage("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={typingMessage}
          onChange={(e) => setTypingMessage(e.target.value)}
        />
        <button>submit</button>
      </form>
    </>
  );
};

export default ChatInputBox;
