import Profile from "./components/Profile";
import Room from "./components/Room";
import RoomList from "./components/RoomList";
import { useRoomContext } from "./context/roomContext";

function App() {
  const { joinedRoomName } = useRoomContext();
  return (
    <>
      <>{joinedRoomName ? <Room /> : <RoomList />}</>
      <Profile />
    </>
  );
}

export default App;
