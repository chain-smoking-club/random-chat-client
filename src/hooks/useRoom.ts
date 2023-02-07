import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  EmitJoinRoomProps,
  EmitLeaveRoomProps,
  EmitMakeRoomProps,
} from "../service/model/roomSchema";
import {
  emitJoinRoom,
  emitLeaveRoom,
  emitMakeRoom,
} from "../service/socketApis/clientToServer";

export default function useRoom() {
  const navigator = useNavigate();
  const { roomId: joinedRoomName } = useParams();

  const makeRoom = async (props: EmitMakeRoomProps) => {
    await emitMakeRoom(props);
    await emitJoinRoom(props);
    navigator(`/room/${props.roomName}`);
  };

  const joinRoom = async (props: EmitJoinRoomProps) => {
    await emitJoinRoom(props);
    navigator(`/room/${props.roomName}`);
  };

  const leaveRoom = async (props: EmitLeaveRoomProps) => {
    await emitLeaveRoom(props);
    navigator(`/lobby`);
  };

  return { joinedRoomName, makeRoom, joinRoom, leaveRoom };
}
