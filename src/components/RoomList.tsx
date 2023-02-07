import { useQuery } from "react-query";
import useInput from "../hooks/useInput";
import useRoom from "../hooks/useRoom";
import { fetchGetRooms } from "../service/httpApis/room";

const RoomList = () => {
  const { input, onChange, onSubmitCallback } = useInput("");
  const { makeRoom, joinRoom } = useRoom();
  const { data: roomNames } = useQuery(["getRooms"], fetchGetRooms, {
    select: (data) => data.data.data,
  });

  const makeRoomSubmit = onSubmitCallback(async () => {
    makeRoom({ roomName: input });
  });

  return (
    <>
      <h2>방 목록</h2>
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
      <form onSubmit={makeRoomSubmit}>
        <input value={input} onChange={onChange} />
        <button>방 만들기</button>
      </form>
    </>
  );
};

export default RoomList;
