import { useState, createContext, ReactNode, useContext } from "react";
import { joinRoom as fetchJoinRoom } from "../service/apis";
import { socket } from "../service/socket";

const roomContext = createContext<{
  joinedRoomName: string | null;
  setJoinedRoomName: React.Dispatch<React.SetStateAction<string | null>>;
  joinRoom: (roomName: string) => void;
} | null>(null);

export const useRoomContext = () => {
  const context = useContext(roomContext);
  if (context === null) throw new Error("no roomContext");
  return context;
};

export const RoomContextProvider = ({ children }: { children: ReactNode }) => {
  const [joinedRoomName, setJoinedRoomName] = useState<string | null>(null);

  const joinRoom = async (roomName: string) => {
    // fetchJoinRoom({ roomName });
    socket.emit("joinRoom", { roomName });
    console.log("!!!");
    setJoinedRoomName(roomName);
  };

  return (
    <roomContext.Provider
      value={{ joinedRoomName, setJoinedRoomName, joinRoom }}
    >
      {children}
    </roomContext.Provider>
  );
};
