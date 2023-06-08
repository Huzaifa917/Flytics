import { combineReducers } from "redux";
import staffReducer from "./staff/staff";

export default combineReducers({
  staff: staffReducer,
});
