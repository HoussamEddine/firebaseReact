import { all } from "redux-saga/effects";
import getS from "./getSujetPlanif";
import getSujetProposSaga from "./getSujetPropos";
import getSujetArchSaga from "./getSujetArch";
import getPresentateursSaga from "./getPresentateur";
import addSujetSaga from "./addSujetAction";
import affectationSaga from "./affectationAction";
import archiveSaga from "./archiveAction";
//import deleteAllS from "./deleteAllAction";
import getLogin from "./loginAction";
import logoutS from "./logoutAction";
import deleteAll from "./deleteAllAction";
import readyMessage from "./addedMsg";
import updateAll from "./updateAllAction";
import addPresentateurSaga from "./addPresentateurAction";
export default function* rootSaga() {
  yield all([
    getS(),
    getSujetArchSaga(),
    getSujetProposSaga(),
    getPresentateursSaga(),
    addSujetSaga(),
    addPresentateurSaga(),
    affectationSaga(),
    archiveSaga(),
    getLogin(),
    logoutS(),
    deleteAll(),
    readyMessage(),
    updateAll()
  ]);
}
