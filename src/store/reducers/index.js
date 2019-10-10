import { combineReducers } from "redux";
import getSujetsReducer from "./getSujetsReducer";

export default combineReducers({
  Sujets_Pr: getSujetsReducer
});
