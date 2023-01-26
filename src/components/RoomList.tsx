import { useQuery } from "react-query";
import useInput from "../hooks/useInput";
import { fetchGetRooms, joinRoom, makeRoom } from "../service/apis";

const RoomList = () => {
  const { input, onChange, onSubmitCallback } = useInput("");

  const { data: roomNames } = useQuery<string[]>(["getRooms"], fetchGetRooms);

  const createRoomSubmit = onSubmitCallback(() => {
    makeRoom({ roomName: input });
  });

  return (
    <>
      <>
        {!roomNames || roomNames.length === 0 ? (
          <div>no room</div>
        ) : (
          roomNames.map((roomName, index) => (
            <div
              key={index}
              onClick={() => {
                joinRoom({ roomName });
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
