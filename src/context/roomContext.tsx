import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { GetRoomsResponse } from "../service/models";
import { socket } from "../service/socket";

const roomContext = createContext<{
  roomNames: string[];
  joinedRoomName: string | null;
  joinRoom: (roomName: string) => void;
  makeRoom: (roomName: string) => void;
  leaveRoom: (roomName: string) => void;
} | null>(null);

export const useRoomContext = () => {
  const context = useContext(roomContext);
  if (context === null) throw new Error("no roomContext");
  return context;
};

export const RoomContextProvider = ({ children }: { children: ReactNode }) => {
  const [joinedRoomName, setJoinedRoomName] = useState<string | null>(null);
  const [roomNames, setRoomNames] = useState<string[]>([]);

  const makeRoom = (roomName: string) => {
    socket.emit("makeRoom", { roomName });
    setRoomNames(roomNames.concat(roomName));
    joinRoom(roomName);
  };

  const joinRoom = (roomName: string) => {
    socket.emit("joinRoom", { roomName });
    setJoinedRoomName(roomName);
  };

  // TODO: 인원 1명일 때 나가면 방 삭제 이벤트 만들기
  const leaveRoom = (roomName: string) => {
    socket.emit("leaveRoom", { roomName });
    setJoinedRoomName(null);
  };

  socket.on("getRooms", (res) => {
    console.log(res, 1);
    setRoomNames(res.rooms);
  });

  useEffect(() => {
    socket.emit("getRooms", (res: GetRoomsResponse) => {
      console.log(res, 2);
      setRoomNames(res.rooms || []);
    });
  }, []);
  const temp = { makeRoom, joinRoom, leaveRoom, roomNames, joinedRoomName };

  return <roomContext.Provider value={temp}>{children}</roomContext.Provider>;
};
