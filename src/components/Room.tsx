import { useRoom } from "../service/apis";
import ChatInputBox from "./ChatInputBox";
import ChatMessages from "./ChatMessages";

const Room = () => {
  const { leaveRoom } = useRoom();
  return (
    <>
      <button onClick={leaveRoom}>방 나가기</button>
      <ChatMessages />
      <ChatInputBox />
    </>
  );
};

export default Room;
