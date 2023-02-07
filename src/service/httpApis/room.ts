import axios from "axios";
import { GetRoomsResponse } from "../model/roomSchema";

export const fetchGetRooms = async () =>
  axios.get<GetRoomsResponse>(
    `${process.env.REACT_APP_HTTP_BACKEND_URL}/api/rooms`
  );
