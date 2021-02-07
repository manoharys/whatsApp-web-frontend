import * as ACTIONS from "./message-actionTypes";

const initialState = {
  user: null,
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
        user: action.payload
      };
    default:
      return state;
  }
};


export default reducer;