import { combineReducers } from "redux";

// import counter from "./counter";
import todos from "./todoReducer";

const rootReducer = combineReducers({
  todos
});

export default rootReducer;