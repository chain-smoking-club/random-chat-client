import { useState, useEffect, createContext, ReactNode } from "react";
import { GetRoomsResponse } from "../service/models";
import { socket } from "../service/socket";

export const roomContext = createContext<{
  roomNames: string[];
  roomName: string | null;
  joinRoom: (roomName: string) => void;
  createRoom: (roomName: string) => void;
  leaveRoom: () => void;
} | null>(null);

const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [roomName, setRoomName] = useState<string | null>(null);
  const [roomNames, setRoomNames] = useState<string[]>([]);

  const createRoom = (roomName: string) => {
    socket.emit("createRoom", roomName);
    setRoomNames(roomNames.concat(roomName));
  };

  const joinRoom = (roomName: string) => {
    socket.emit("joinRoom", roomName);
    setRoomName(roomName);
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setRoomName(null);
  };

  socket.on("getRooms", (roomNames) => {
    setRoomNames(roomNames);
  });
  useEffect(() => {
    socket.emit("getRooms", (response: GetRoomsResponse) => {
      setRoomNames(response.roomNames || []);
    });
  }, []);
  const temp = { createRoom, joinRoom, leaveRoom, roomNames, roomName };

  if (roomContext === null) throw new Error("ppap");
  return <roomContext.Provider value={temp}>{children}</roomContext.Provider>;
};

export default RoomProvider;
