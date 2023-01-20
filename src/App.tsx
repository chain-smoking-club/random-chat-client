import { useContext } from "react";
import { UserContext } from ".";
import Profile from "./components/Profile";
import Room from "./components/Room";
import RoomList from "./components/RoomList";

function App() {
  const { getRoomName } = useContext(UserContext);

  return (
    <>
      <>{getRoomName() ? <Room /> : <RoomList />}</>
      <Profile />
    </>
  );
}

export default App;
