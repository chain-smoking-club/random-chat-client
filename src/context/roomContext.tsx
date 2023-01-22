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
  createRoom: (roomName: string) => void;
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

  const createRoom = (roomName: string) => {
    socket.emit("createRoom", roomName);
    setRoomNames(roomNames.concat(roomName));
    joinRoom(roomName);
  };

  const joinRoom = (roomName: string) => {
    socket.emit("joinRoom", roomName);
    setJoinedRoomName(roomName);
  };

  // TODO: 인원 1명일 때 나가면 방 삭제 이벤트 만들기
  const leaveRoom = (roomName: string) => {
    socket.emit("leaveRoom", roomName);
    setJoinedRoomName(null);
  };

  socket.on("getRooms", (roomNames) => {
    setRoomNames(roomNames);
  });
  useEffect(() => {
    socket.emit("getRooms", (response: GetRoomsResponse) => {
      setRoomNames(response.roomNames || []);
    });
  }, []);
  const temp = { createRoom, joinRoom, leaveRoom, roomNames, joinedRoomName };

  return <roomContext.Provider value={temp}>{children}</roomContext.Provider>;
};
