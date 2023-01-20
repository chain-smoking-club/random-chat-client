import { useState, useEffect, useContext } from "react";
import { UserContext } from "..";
import { GetRoomsResponse, Message } from "./models";
import { socket } from "./socket";

export const sendMessage = (content: Message["content"]) => {
  socket.emit("sendMessage", { content });
};

export const onReceiveMessage = (
  callback: (content: Message["content"]) => void
) => {
  socket.on("receiveMessage", (receiveMessage: Message) => {
    callback(receiveMessage.content);
  });
  return () => {
    socket.off("receiveMessage");
  };
};

// export const createRoom = (roomName: string) =>
//   socket.emit("createRoom", roomName);

// export const joinRoom = (roomName: string) => socket.emit("joinRoom", roomName);

// export const leaveRoom = () => socket.emit("leaveRoom");

// export const useGetRoomNames = () => {
//   const [roomNames, setRoomNames] = useState<string[]>([]);

//   useEffect(() => {
//     socket.emit("getRooms", (response: GetRoomsResponse) => {
//       if (JSON.stringify(roomNames) !== JSON.stringify(response.roomNames)) {
//         setRoomNames(response.roomNames || []);
//       }
//     });
//   }, [roomNames]);

//   return { roomNames };
// };

export const useRoom = () => {
  const { setRoomName } = useContext(UserContext);
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
  useEffect(() => {
    socket.emit("getRooms", (response: GetRoomsResponse) => {
      if (JSON.stringify(roomNames) !== JSON.stringify(response.roomNames)) {
        setRoomNames(response.roomNames || []);
      }
    });
  }, [roomNames]);

  return { createRoom, joinRoom, leaveRoom, roomNames };
};
