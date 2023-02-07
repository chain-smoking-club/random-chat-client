import { SignRequestProps } from "../service/model/authSchema";

export type AuthContextProps = {
  hasAuth: boolean;
  signup: (props: SignRequestProps) => void;
  login: (props: SignRequestProps) => void;
  logout: VoidFunction;
};
