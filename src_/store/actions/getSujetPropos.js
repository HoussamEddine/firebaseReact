import fctGet from "../../api/fctGet";

import { call, put, takeEvery, all } from "redux-saga/effects";

function fetchSujetsProposApi() {
  return fctGet("/Sujets")
    .then(response => {
      return response;
    })
    .catch(error => ({ error }));
}

function* getSujetPropos() {
  try {
    const data = yield call(fetchSujetsProposApi);

    yield put({ type: "DATA_READY", data });
  } catch (error) {
    yield put({ error });
  }
}

function* getSujetProposSaga() {
  yield takeEvery("SUJETPROPOS_REQUESTED", getSujetPropos);
}
export default getSujetProposSaga;
