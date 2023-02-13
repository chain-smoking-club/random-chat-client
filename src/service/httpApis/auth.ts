import axios from "axios";
import { handleError } from "../../error";
import {
  SignRequestProps,
  SignResponseProps,
  SignUpRequestProps,
} from "../model/authSchema";

export function fetchLogin(props: SignRequestProps) {
  return getInstance().post("auth/login", props);
}

export function fetchSignup(props: SignUpRequestProps) {
  return getInstance().post<SignResponseProps>("users", props);
}

const getInstance = () => {
  if (!import.meta.env.VITE_HTTP_BACKEND_URL)
    handleError(new Error("no environment variable : VITE_HTTP_BACKEND_URL"));

  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/`,
  });

  return instance;
};
