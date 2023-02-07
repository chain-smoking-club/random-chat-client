export type Room = {
  roomName: string;
};

export type Message = {
  content: string;
  roomName: string;
};

export type GetRoomsResponse = {
  data: string[];
};

export type EmitSendMessageProps = {
  content: Message["content"];
  roomName: string;
};

export type EmitMakeRoomProps = {
  roomName: string;
};

export type EmitJoinRoomProps = {
  roomName: string;
};

export type EmitLeaveRoomProps = {
  roomName: string;
};
