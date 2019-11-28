import firebase from "./../../config/config";
import auth from "./auth";
/*
const logoutAction = e => {
  return dispatch => {
    e.preventDefault();

    firebase
      .auth()
      .signOut()
      .then(u => {
        dispatch(auth(false, null));
      })
      .catch(error => {
        dispatch(auth(true, error));
      });
  };
};
export default logoutAction;
//////*/

import { call, put, takeEvery } from "redux-saga/effects";

function* LogoutS(e) {
  try {
    yield firebase.auth().signOut();
    yield put(auth(false, null));
  } catch (error) {
    yield put(auth(error));
  }
}
function* LogOutSaga() {
  yield takeEvery("LOGOUT_S", LogoutS);
}
export default LogOutSaga;
