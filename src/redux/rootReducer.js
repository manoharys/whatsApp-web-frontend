import { combineReducers } from "redux";
import rooms from "./messages/messages-reducers";

const rootReducer = combineReducers({
  rooms,
});

export default rootReducer;
