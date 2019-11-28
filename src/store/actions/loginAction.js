import firebase from "../../config/config";
import auth from "./auth";
import { call, put, takeEvery } from "redux-saga/effects";

function* loginSaga(obj) {
  try {
    const data = yield firebase
      .auth()
      .signInWithEmailAndPassword(obj.email, obj.password);

    if (data.user) {
      yield auth(true, null);
    }
  } catch (error) {
    yield auth(false, error);
  }
}
function* getLogin() {
  yield takeEvery("LOGIN_REQUESTED", loginSaga);
}
export default getLogin;

/**
const loginAction = (e, email, password) => {
  return dispatch => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(u => {
        dispatch(auth(true, null));
      })
      .catch(error => {
        dispatch(auth(false, error));

      });
  };
};
export default loginAction;
****************** */
/*
 *  function* loginSaga(email, password) {
  try {
    const data = yield call(rsf.auth.signInWithEmailAndPassword, email, password);
    yield put(loginSuccess(data));
  }
  catch(error) {
    yield put(loginFailure(error));
  }
}

*/
