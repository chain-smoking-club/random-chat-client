import axios from "axios";
import { GetRoomsResponse } from "../model/roomSchema";

export const fetchGetRooms = async () =>
  axios.get<GetRoomsResponse>(
    `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/rooms`
  );
