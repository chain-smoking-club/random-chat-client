import { useContext } from "react";
import { roomContext } from "../context/roomContext";
import useInput from "../hooks/useInput";

const RoomList = () => {
  const context = useContext(roomContext);
  const { input, onChange, onSubmitCallback } = useInput("");

  const createRoomSubmit = onSubmitCallback(() => {
    context?.createRoom(input);
  });

  return (
    <>
      <>
        {context?.roomNames.length === 0 ? (
          <div>no room</div>
        ) : (
          context?.roomNames.map((roomName, index) => (
            <div
              key={index}
              onClick={() => {
                context?.joinRoom(roomName);
              }}
            >
              {roomName}
            </div>
          ))
        )}
      </>
      <form onSubmit={createRoomSubmit}>
        <input value={input} onChange={onChange} />
        <button>방 만들기</button>
      </form>
    </>
  );
};

export default RoomList;
