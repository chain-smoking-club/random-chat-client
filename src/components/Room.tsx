import { useRoomContext } from "../context/roomContext";
import ChatInputBox from "./ChatInputBox";
import ChatMessages from "./ChatMessages";

const Room = () => {
  const { leaveRoom } = useRoomContext();
  return (
    <>
      <button onClick={leaveRoom}>방 나가기</button>
      <ChatMessages />
      <ChatInputBox />
    </>
  );
};

export default Room;
