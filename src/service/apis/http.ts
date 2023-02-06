export const fetchGetRooms = async () =>
  (
    await fetch(`${process.env.REACT_APP_WEB_HTTP_BACKEND_URL}/api/rooms`)
  ).json();
