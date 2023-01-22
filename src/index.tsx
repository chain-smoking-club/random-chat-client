import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RoomContextProvider } from "./context/roomContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RoomContextProvider>
      <App />
    </RoomContextProvider>
  </React.StrictMode>
);
