import axios from "axios";
import { handleError } from "../../error";
import { storage } from "../../storage";
import { GetRoomsResponse } from "../model/roomSchema";

export const fetchGetRooms = async () =>
  getInstance().get<GetRoomsResponse>(
    `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/rooms`
  );

const getInstance = () => {
  if (!import.meta.env.VITE_HTTP_BACKEND_URL)
    handleError(new Error("no environment variable : VITE_HTTP_BACKEND_URL"));

  if (!storage.get("ACCESS_TOKEN")) handleError(new Error("no access token"));

  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/`,
    headers: {
      Authorization: `Bearer ${storage.get("ACCESS_TOKEN")}`,
    },
  });

  return instance;
};
