import * as ACTIONS from "./message-actionTypes";

const initialState = {
  user: null,

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case ACTIONS.UPDATE_ROOM:
      return {
        ...state,
        rooms: [
          ...state.rooms,
          {
            _id: action.payload.roomId,
            name: action.payload.roomName,
            roomMessages: [
              {
                _id: action.payload.messageId,
                name: action.payload.name,
                date: action.payload.date,
              },
            ],
          },
        ],
      };
    default:
      return state;
  }
};

export default reducer;
