export interface Room {
  roomName: string;
}

export interface Message {
  content: string;
  roomName: string;
}

export interface GetRoomsResponse {
  rooms: string[];
}
