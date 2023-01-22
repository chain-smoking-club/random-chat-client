import { useRoomContext } from "../context/roomContext";
import ChatInputBox from "./ChatInputBox";
import ChatMessages from "./ChatMessages";

const Room = () => {
  const { leaveRoom, joinedRoomName } = useRoomContext();
  return (
    <>
      <button
        onClick={() => {
          if (!joinedRoomName)
            throw new Error("no joinedRoomName : on leaveRoom func");
          leaveRoom(joinedRoomName);
        }}
      >
        방 나가기
      </button>
      <ChatMessages />
      <ChatInputBox />
    </>
  );
};

export default Room;
