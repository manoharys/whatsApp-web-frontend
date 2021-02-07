import axios from "axios";

export const getRooms = async () => {
  try {
    const rooms = await axios.get("http://localhost:3030/posts/room");
    return rooms;
  } catch (error) {
    console.log(error);
  }
};

