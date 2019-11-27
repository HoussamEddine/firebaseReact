import update from "../../api/updateAll";
import getPresentateur from "./getPresentateur";
import getSujetProps from "./getSujetPropos";
import getSujetArch from "./getSujetArch";
import getSujetPlanif from "./getSujetPlanif";

import { call, put, takeEvery } from "redux-saga/effects";

function* UpdateS(object) {
  yield update(object.dbName, object.s, object.id);
  try {
    if (object.dbName === "Sujets") {
      yield put({ type: "SUJETPROPOS_REQUESTED" });
    } else if (object.dbName === "Presentateurs") {
      yield put({ type: "PRESENTATEURS_REQUESTED" });
    } else {
      yield put({ type: "SUJET_REQUESTED" });
    }
  } catch (error) {
    yield put({ error });
  }
}

function* UpdateSaga() {
  yield takeEvery("UPDATE_S", UpdateS);
}
export default UpdateSaga;

/*
const updateAction = (dbName, s, Id, dispatch) => {
  return () => {
    update(dbName, s, Id);
    if (dbName === "Sujets") {
      dispatch(getSujetProps());
    } else if (dbName === "Presentateurs") {
      dispatch(getPresentateur());
    } else if(dbName === "Sujets_pr"){
      dispatch(getSujetPlanif());
    }
  };
};
export default updateAction;*/
