import useInput from "../hooks/useInput";
import { customEventNames } from "../service/customEventNames";
import { socket } from "../service/socket";

const ChatInputBox = () => {
  const { input: typingMessage, onChange, resetInput } = useInput("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typingMessage) {
      socket.emit(customEventNames.sendMessage, { content: typingMessage });
      resetInput();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={typingMessage} onChange={onChange} />
        <button>submit</button>
      </form>
    </>
  );
};

export default ChatInputBox;
