import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { handleError } from "../error";
import { fetchLogin, fetchSignup } from "../service/httpApis/auth";
import { storage } from "../storage";
import { AuthContextProps } from "../types/auth";
import { useSocket } from "./socket";

const AuthContext = createContext<AuthContextProps>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [hasAuth, setHasAuth] = useState(false);
  const { connectSocket } = useSocket();

  const signup: AuthContextProps["signup"] = async (props) => {
    try {
      await fetchSignup(props);
    } catch (err) {
      handleError(err);
    }
  };

  const login: AuthContextProps["login"] = async (props) => {
    try {
      const res = await fetchLogin(props);
      storage.set("ACCESS_TOKEN", res.data.data.access_token);
      setHasAuth(true);
      connectSocket();
    } catch (err) {
      handleError(err);
    }
  };

  const logout: AuthContextProps["logout"] = () => {
    storage.remove("ACCESS_TOKEN");
    setHasAuth(false);
  };

  useEffect(() => {
    setHasAuth(storage.get("ACCESS_TOKEN") ? true : false);
  }, []);

  return (
    <AuthContext.Provider value={{ hasAuth, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
