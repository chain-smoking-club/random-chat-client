import { useRoomContext } from "../context/roomContext";
import useInput from "../hooks/useInput";
import { sendMessage } from "../service/apis/socketClientToServer";

const ChatInputBox = () => {
  const { input: typingMessage, onChange, onSubmitCallback } = useInput("");
  const { joinedRoomName } = useRoomContext();
  const onSubmit = onSubmitCallback(async () => {
    if (!joinedRoomName) throw new Error("no joinedRoomName : at chatinputbox");
    if (typingMessage.length > 0)
      sendMessage({ content: typingMessage, roomName: joinedRoomName });
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
