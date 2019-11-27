import deleteA from "./../../api/deleteAll";
import getPresentateur from "./getPresentateur";
import getSujetProps from "./getSujetPropos";
import getSujetPlanif from "./getSujetPlanif";

import { call, put, takeEvery } from "redux-saga/effects";

function* deleteS(object) {
  yield deleteA(object.dbName, object.id);
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
function* deleteAll() {
  yield takeEvery("DELETE_ALL", deleteS);
}
export default deleteAll;

/*
const deleteSP = (dbName, Id, dispatch) => {
  return () => {
    deleteA(dbName, Id);
    if (dbName === "Sujets") {
      dispatch(getSujetProps());
    } else if (dbName === "Presentateurs") {
      dispatch(getPresentateur());
    } else {
      dispatch(getSujetPlanif());
    }
  };
};
export default deleteSP;*/
