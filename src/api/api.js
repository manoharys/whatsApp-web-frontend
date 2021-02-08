import axios from "axios";

export const getRooms = async () => {
  try {
    const rooms = await axios.get("http://localhost:3030/posts/room");
    return rooms;
  } catch (error) {
    console.log(error);
  }
};

export const addRooms = async (data) => {
  try {
    const url = "http://localhost:3030/posts/room";
    const addRooms = await axios({
      method: "post",
      url: url,
      data: {
        name: data.name,
        roomMessages: {
          name: data.roomMessages.name,
          message: data.roomMessages.message,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleRoom = async (id) => {
  try {
    const room = await axios.get(`http://localhost:3030/posts/room/${id}`);
    return room;
  } catch (error) {
    console.log(error);
  }
};
