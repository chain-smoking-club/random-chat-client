import {
  SignRequestProps,
  SignUpRequestProps,
} from "../service/model/authSchema";

export type AuthContextProps = {
  hasAuth: boolean;
  signup: (props: SignUpRequestProps) => void;
  login: (props: SignRequestProps) => void;
  logout: VoidFunction;
};
