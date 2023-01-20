import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const ppap = (() => {
  let roomName: string | null = null;
  const getRoomName = () => roomName;
  const setRoomName = (arg: string | null) => {
    roomName = arg;
  };
  return { getRoomName, setRoomName };
})();

export const UserContext = createContext(ppap);

root.render(
  <React.StrictMode>
    <UserContext.Provider value={ppap}>
      <App />
    </UserContext.Provider>
  </React.StrictMode>
);
