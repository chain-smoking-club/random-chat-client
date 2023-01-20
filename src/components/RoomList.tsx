import { useContext } from "react";
import { UserContext } from "..";
import { useRoom } from "../service/apis";

const RoomList = () => {
  const { roomNames, joinRoom, createRoom } = useRoom();
  const { setRoomName } = useContext(UserContext);

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
                setRoomName(roomName);
                joinRoom(roomName);
              }}
            >
              {roomName}
            </div>
          ))
        )}
      </>
      <button onClick={() => createRoom("새방")}>방 만들기</button>
    </>
  );
};

export default RoomList;
