import { useQuery } from "react-query";
import { useRoomContext } from "../context/roomContext";
import useInput from "../hooks/useInput";
import { fetchGetRooms, makeRoom } from "../service/apis";

const RoomList = () => {
  const { input, onChange, onSubmitCallback } = useInput("");
  const { data } = useQuery<{ data: string[] }>(["getRooms"], fetchGetRooms);
  const roomNames = data?.data;
  const { joinRoom } = useRoomContext();

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
