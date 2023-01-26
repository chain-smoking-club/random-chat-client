import { useRoomContext } from "../context/roomContext";
import useInput from "../hooks/useInput";
import { sendMessage } from "../service/apis";

const ChatInputBox = () => {
  const { input: typingMessage, onChange, onSubmitCallback } = useInput("");
  const { joinedRoomName } = useRoomContext();
  const onSubmit = onSubmitCallback(() => {
    if (!joinedRoomName) throw new Error("no joinedRoomName : at chatinputbox");
    if (typingMessage.length > 0) sendMessage(typingMessage, joinedRoomName);
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
