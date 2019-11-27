import fctGet from "../../api/fctGet";

import { call, put, takeEvery } from "redux-saga/effects";

function fetchSujetsApi() {
  return fctGet("/Sujets_pr")
    .then(response => {
      return response;
    })
    .catch(error => ({ error }));
}

function* getSujetPlanif() {
  try {
    const data = yield call(fetchSujetsApi);

    yield put({ type: "SUJETSPL_READY", data });
  } catch (error) {
    yield put({ error });
  }
}

function* getS() {
  yield takeEvery("SUJET_REQUESTED", getSujetPlanif);
}
export default getS;
