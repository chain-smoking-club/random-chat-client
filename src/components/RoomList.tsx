import { useQuery } from "react-query";
import styled from "styled-components";
import { useSocket } from "../context/socket";
import useInput from "../hooks/useInput";
import { fetchGetRooms } from "../service/httpApis/room";

const RoomList = () => {
  const { input, onChange, onSubmitCallback } = useInput("");
  const { makeRoom, joinRoom } = useSocket();
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
            <StyledRoom
              key={index}
              onClick={() => {
                joinRoom({ roomName });
              }}
            >
              {roomName}
            </StyledRoom>
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

const StyledRoom = styled.div`
  &:hover {
    cursor: pointer;
  }
`;
