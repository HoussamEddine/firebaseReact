import added from "./addedMsg";
import addPresentateur from "./../../api/addPresentateur";
import getPresentateur from "./getPresentateur";

import { call, put, takeEvery } from "redux-saga/effects";

function* addPresentateurS(obj) {
  yield addPresentateur(obj.dbName, obj.id, obj.nom, obj.prenom, obj.email);
  try {
    const msg = { name: "Presentateur", bool: true, msg: "Ajouté avec succès" };
    yield put({ type: "READY_MESSAGE", msg });
    yield put({ type: "PRESENTATEURS_REQUESTED" });
  } catch (e) {
    const msg = { name: "Presentateur", bool: false, msg: "Erreur" };
    yield put({ type: "READY_MESSAGE", msg });
  }
}
function* addPresentateurSaga() {
  yield takeEvery("ADD_PRESENTATEUR", addPresentateurS);
}
export default addPresentateurSaga;

/*function* addPresentateur(dbName, presentateurId, Nom, Prenom, Email){
  yield put(
    addPresentateur(dbName,presentateurId,Nom,Prenom,Email)
    .then(
      yield call(added("user",true,"Ajouté avec succès")),
      yield call({type:"PRESENTATEURS_REQUESTED"})
    )
    .catch(error =>({error}))
  )
}*/

/*
const addPresentateurAction = (
  e,
  dbName,
  presentateurId,
  Nom,
  Prenom,
  Email
) => {
  return dispatch => {
    e.preventDefault();

    addPresentateur(e, dbName, presentateurId, Nom, Prenom, Email)
      .then(u => {
        dispatch(added("user", true, "Ajouté avec succès "));
        dispatch(getPresentateur());
      })
      .catch(e => {
        console.log(e);
        dispatch(added("user", false, "Erreur"));
      });
  };
};
export default addPresentateurAction;*/
