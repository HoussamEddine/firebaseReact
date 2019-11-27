import added from "./addedMsg";
import addSujet from "./../../api/addSujet";
import getSujetPropos from "./getSujetPropos";

import { delay, put, takeEvery } from "redux-saga/effects";

function* addSujetS(obj) {
  yield addSujet(obj.dbName, obj.id, obj.suj);
  try {
    const msg = { name: "Sujets", bool: true, msg: "Ajouté avec succès" };
    yield put({ type: "READY_MESSAGE", msg });
    yield put({ type: "SUJETPROPOS_REQUESTED" });
  } catch (e) {
    const msg = { name: "Sujets", bool: false, msg: "Erreur" };
    yield put({ type: "READY_MESSAGE", msg });
  }
}

function* addSujetSaga() {
  yield takeEvery("ADD_SUJET", addSujetS);
}
export default addSujetSaga;

/*
const addSujetAction = (e, dbName, sujetId, sujet) => {
  return dispatch => {
    addSujet(e, dbName, sujetId, sujet)
      .then(u => {
        dispatch(added("Sujets", true, "Ajouté avec Succès"));
        dispatch(getSujetPropos());
      })
      .catch(e => {
        dispatch(added("Sujets", false, "Erreur"));
      });
  };
};
export default addSujetAction;
*/
