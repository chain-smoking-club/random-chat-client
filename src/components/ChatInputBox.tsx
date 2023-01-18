import useInput from "../hooks/useInput";
import { socketEvent } from "../service/socket";

const ChatInputBox = () => {
  const { input: typingMessage, onChange, onSubmitCallback } = useInput("");

  const onSubmit = onSubmitCallback(() => {
    if (typingMessage.length > 0) socketEvent.emitSendMessage(typingMessage);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={typingMessage} onChange={onChange} />
        <button>submit</button>
      </form>
    </>
  );
};

export default ChatInputBox;
