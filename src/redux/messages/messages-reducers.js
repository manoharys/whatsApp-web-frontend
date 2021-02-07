import * as ACTIONS from "./message-actionTypes";

const initialState = {
  user: [],
  rooms: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ROOMS:
      return {
        ...state,
        rooms: action.payload
      };
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload.userData,
      };
    default:
      return state;
  }
};


export default reducer;