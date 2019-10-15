import { combineReducers } from "redux";
import getSujetsReducer from "./getSujetsReducer";
import getSujetsPlReducer from "./getSujetsPlReducer";
import getSujetsarchReducer from "./getSujetsarchReducer";

export default combineReducers({
  Sujets: getSujetsReducer,
  SujetsPl: getSujetsPlReducer,
  Sujetsarch: getSujetsarchReducer
});