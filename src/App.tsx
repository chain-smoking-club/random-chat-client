import Profile from "./components/Profile";
import Room from "./components/Room";
import RoomList from "./components/RoomList";
import { roomContext } from "./context/roomContext";
import { useContext } from "react";

function App() {
  const context = useContext(roomContext);
  return (
    <>
      <>{context?.roomName ? <Room /> : <RoomList />}</>
      <Profile />
    </>
  );
}

export default App;
