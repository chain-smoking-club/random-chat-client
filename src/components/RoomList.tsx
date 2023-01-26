import { useRoomContext } from "../context/roomContext";
import useInput from "../hooks/useInput";

const RoomList = () => {
  const { makeRoom, roomNames, joinRoom } = useRoomContext();
  const { input, onChange, onSubmitCallback } = useInput("");

  const createRoomSubmit = onSubmitCallback(() => {
    makeRoom(input);
  });

  return (
    <>
      <>
        {roomNames.length === 0 ? (
          <div>no room</div>
        ) : (
          roomNames.map((roomName, index) => (
            <div
              key={index}
              onClick={() => {
                joinRoom(roomName);
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
