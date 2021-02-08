import * as ACTIONS from "./message-actionTypes";
import * as api from "../../api/api";

export const getRooms = () => async (dispatch) => {
  try {
    const rooms = await api.getRooms();
    return dispatch({
      type: ACTIONS.GET_ROOMS,
      payload: rooms.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setUser = (data) => {
  return {
    type: ACTIONS.SET_USER,
    payload: data,
  };
};

export const updateRoomData = (data) => {
  return {
    type: ACTIONS.UPDATE_ROOM,
    payload: {
      roomName: data.roomName,
      roomId: data.roomId,
      name: data.name,
      message: data.message,
      messageId: data.messageId,
      date: data.date,
    },
  };
};


