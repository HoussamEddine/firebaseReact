import { combineReducers } from "redux";
import getSujetsReducer from "./getSujetsReducer";
import getSujetsPlReducer from "./getSujetsPlReducer";
import getSujetsarchReducer from "./getSujetsarchReducer";
import getPresentateursReducer from "./getPresentateursReducer";

import auth from "./auth";
import added from "./added";

export default combineReducers({
  Sujets: getSujetsReducer,
  SujetsPl: getSujetsPlReducer,
  Sujetsarch: getSujetsarchReducer,
  Presentateurs: getPresentateursReducer,

  auth: auth,
  added: added
});
