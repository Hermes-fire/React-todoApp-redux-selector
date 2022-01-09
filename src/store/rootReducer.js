import { combineReducers } from "redux";
import todoReducer from "../containers/Box/reducer";

export default combineReducers({
  todoState: todoReducer,
});