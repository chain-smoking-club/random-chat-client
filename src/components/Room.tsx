import { useContext } from "react";
import { roomContext } from "../context/roomContext";
import ChatInputBox from "./ChatInputBox";
import ChatMessages from "./ChatMessages";

const Room = () => {
  const context = useContext(roomContext);
  return (
    <>
      <button onClick={context?.leaveRoom}>방 나가기</button>
      <ChatMessages />
      <ChatInputBox />
    </>
  );
};

export default Room;
