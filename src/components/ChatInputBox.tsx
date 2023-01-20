import useInput from "../hooks/useInput";
import { sendMessage } from "../service/apis";

const ChatInputBox = () => {
  const { input: typingMessage, onChange, onSubmitCallback } = useInput("");
  const onSubmit = onSubmitCallback(() => {
    if (typingMessage.length > 0) sendMessage(typingMessage);
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
