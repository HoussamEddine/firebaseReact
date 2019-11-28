import archive from "./../../api/archive";

import added from "./addedMsg";
import deleteSP from "./../../api/deleteAll";
import getSujetPlanif from "./getSujetPlanif";
/*const archiveAction = (
  e,
  dbName,
  dbNameS,
  presentateurId,
  ArchId,
  Sujet,
  Presentateur,
  date,
  Lien,
  Lien2
) => {
  return dispatch => {
    e.preventDefault();

    archive(dbName, e, ArchId, Sujet, Presentateur, date, Lien, Lien2)
      .then(u => {
        dispatch(added("archive", true, " "));
        dispatch(deleteSP(dbNameS, presentateurId, dispatch));
        dispatch(getSujetPlanif());
      })
      .catch(e => {
        dispatch(added("archive", false, "Erreur"));
      });
  };
};

export default archiveAction;
//*/
import { put, takeEvery } from "redux-saga/effects";

function* archiveS(obj) {
  yield archive(
    obj.dbName,
    obj.ArchId,
    obj.Sujet,
    obj.Presentateur,
    obj.date,
    obj.Lien,
    obj.Lien2
  );
  try {
    yield deleteSP(obj.dbNameS, obj.presentateurId);

    yield put({ type: "SUJET_REQUESTED" });

    const msg = { name: "Archive", bool: true, msg: "Archivé avec succès" };
    yield put({ type: "READY_MESSAGE", msg });
  } catch (e) {
    const msg = { name: "Archive", bool: false, msg: "Erreur" };
    yield put({ type: "READY_MESSAGE", msg });
  }
}
function* archiveSaga() {
  yield takeEvery("ARCHIVE_S", archiveS);
}
export default archiveSaga;
