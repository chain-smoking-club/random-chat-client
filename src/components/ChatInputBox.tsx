import useInput from "../hooks/useInput";
import useRoom from "../hooks/useRoom";
import { emitSendMessage } from "../service/socketApis/clientToServer";

const ChatInputBox = () => {
  const { input: typingMessage, onChange, onSubmitCallback } = useInput("");
  const { joinedRoomName } = useRoom();

  const onSubmit = onSubmitCallback(async () => {
    if (!joinedRoomName) throw new Error("no joinedRoomName : at chatinputbox");
    if (typingMessage.length > 0)
      emitSendMessage({ content: typingMessage, roomName: joinedRoomName });
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
