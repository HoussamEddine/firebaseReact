import added from "./addedMsg";
import deleteSPR from "./deleteAllAction";
import addAffect from "./../../api/addAffect";
/*
const affectationAction = (
  e,
  dbName,
  dbNameS,
  sujetsPId,
  affectId,
  sujet,
  presentateur,
  date
) => {
  return dispatch => {
    e.preventDefault();
    addAffect(e, dbName, affectId, sujet, presentateur, date)
      .then(u => {
        dispatch(added("affectation", true, "Ajouté avec succès"));
        dispatch(deleteSPR(dbNameS, sujetsPId, dispatch));
      })

      .catch(e => {
        console.log(e);
        dispatch(added("affectation", false, "Erreur"));
      });
  };
};
export default affectationAction;
////////*/

import { call, put, takeEvery } from "redux-saga/effects";

function* affectationS(obj) {
  yield addAffect(
    obj.dbName,
    obj.affectId,
    obj.sujet,
    obj.presentateur,
    obj.date
  );
  try {
    // yield put({
    //   type: "DELETE_ALL",
    //   dbName: obj.dbName,
    //   id: obj.affectId
    // });
    const msg = { name: "affectation", bool: true, msg: "Ajouté avec succès" };
    yield put({ type: "READY_MESSAGE", msg });
  } catch (e) {
    const msg = { name: "Archive", bool: false, msg: "Erreur" };
    yield put({ type: "READY_MESSAGE", msg });
  }
}
function* affectationSaga() {
  yield takeEvery("AFFECTATION_SA", affectationS);
}
export default affectationSaga;
