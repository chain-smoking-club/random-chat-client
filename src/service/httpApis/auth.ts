import axios from "axios";
import { handleError } from "../../error";
import { SignRequestProps, SignResponseProps } from "../model/authSchema";

export function fetchLogin(props: SignRequestProps) {
  return getInstance().post<SignResponseProps>("login", props);
}

export function fetchSignup(props: SignRequestProps) {
  return getInstance().post<SignResponseProps>("signup", props);
}

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_HTTP_BACKEND_URL}/auth/`,
});

const getInstance = () => {
  if (!import.meta.env.VITE_HTTP_BACKEND_URL)
    handleError(new Error("no environment variable : VITE_HTTP_BACKEND_URL"));

  return instance;
};
