import { EventResponse, Message } from "./models";
import { ClientToServerEvents, ServerToClientEvents, socket } from "./socket";

// TODO: message에 발신자 닉네임 포함하기
export const sendMessage = async (args: {
  content: Message["content"];
  joinedRoomName: string;
}) => socketFactory("sendMessage", args);

export const makeRoom = async (args: { roomName: string }) =>
  socketFactory("makeRoom", args);

export const joinRoom = async (args: { roomName: string }) =>
  socketFactory("joinRoom", args);

export const leaveRoom = async (args: { roomName: string }) =>
  socketFactory("leaveRoom", args);

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

// TODO: 타입 단언 쓰지 않고 해결하기
const getEventResponseName = (
  eventName: keyof ClientToServerEvents
): keyof ServerToClientEvents =>
  (eventName + "Response") as keyof ServerToClientEvents;

// TODO: 적절한 함수명으로 바꾸기, args 타입 정의하기
const socketFactory = async (
  eventName: keyof ClientToServerEvents,
  args: any
) => {
  socketErrorHandler(
    await new Promise<EventResponse>((resolve, reject) => {
      socket.emit(eventName, args);
      socket.on(getEventResponseName(eventName), (res: EventResponse) => {
        if (res.status === "SUCCESS") resolve(res);
        else reject(res);
      });
    })
  );
};

export const socketErrorHandler = (eventResponse: EventResponse) => {
  if (eventResponse.status === "FAIL") throw new Error("socket error");
};

export const fetchGetRooms = async () =>
  (
    await fetch(`${process.env.REACT_APP_WEB_HTTP_BACKEND_URL}/api/rooms`)
  ).json();
