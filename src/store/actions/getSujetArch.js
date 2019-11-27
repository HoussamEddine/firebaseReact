
/** 
const getSujetsArch = () => {
  return dispatch => {
    let data = fctGet("Sujets_arch");
    data.then(data =>
      dispatch({
        type: "SUJETSARCH_READY",
        payload: data.payload,
        ArchId: data.Id
      })
    );
  };
};

export default getSujetsArch;*/

import fctGet from "../../api/fctGet";
import { call, put, takeEvery } from "redux-saga/effects";

function fetchSujetArchApi() {
  return fctGet("/Sujets_arch")
    .then(response => {
      return response;
    })
    .catch(error => ({ error }));
}
function* getSujetArch() {
  try{
    const data = yield call(fetchSujetArchApi);
    yield put({ type: "SUJETSARCH_READY",data });
  } catch(error){
    yield put({ error });
  }
}
function* getSujetArchSaga() {
  yield takeEvery("SUJETARCH_REQUESTED", getSujetArch);
}
export default getSujetArchSaga;