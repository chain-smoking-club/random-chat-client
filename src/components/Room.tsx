import { useSocket } from "../context/socket";
import useRoom from "../hooks/useRoom";
import ChatInputBox from "./ChatInputBox";
import ChatMessages from "./ChatMessages";

const Room = () => {
  const { joinedRoomName, leaveRoom } = useSocket();
  return (
    <>
      <h2>방제: {joinedRoomName}</h2>
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
