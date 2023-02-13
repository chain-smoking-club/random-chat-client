import {
  EmitJoinRoomProps,
  EmitLeaveRoomProps,
  EmitMakeRoomProps,
  EmitSendMessageProps,
} from "../service/model/roomSchema";

export type SocketContextProps = {
  joinedRoomName?: string;
  connectSocket: VoidFunction;
  makeRoom: (props: EmitMakeRoomProps) => void;
  joinRoom: (props: EmitJoinRoomProps) => void;
  leaveRoom: (props: EmitLeaveRoomProps) => void;
  sendMessage: (props: EmitSendMessageProps) => void;
};
