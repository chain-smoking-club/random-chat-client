import { useRoomContext } from "../context/roomContext";
import { leaveRoom } from "../service/apis";
import ChatInputBox from "./ChatInputBox";
import ChatMessages from "./ChatMessages";

const Room = () => {
  const { joinedRoomName } = useRoomContext();
  return (
    <>
      <button
        onClick={() => {
          if (!joinedRoomName)
            throw new Error("no joinedRoomName : on leaveRoom func");
          leaveRoom({ roomName: joinedRoomName });
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
