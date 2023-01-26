import { useState, createContext, ReactNode, useContext } from "react";

const roomContext = createContext<{
  joinedRoomName: string | null;
  setJoinedRoomName: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

export const useRoomContext = () => {
  const context = useContext(roomContext);
  if (context === null) throw new Error("no roomContext");
  return context;
};

export const RoomContextProvider = ({ children }: { children: ReactNode }) => {
  const [joinedRoomName, setJoinedRoomName] = useState<string | null>(null);

  return (
    <roomContext.Provider value={{ joinedRoomName, setJoinedRoomName }}>
      {children}
    </roomContext.Provider>
  );
};
