import { all } from "redux-saga/effects";
import getS from "./getSujetPlanif";
import getSujetProposSaga from "./getSujetPropos";

export default function* rootSaga() {
  yield all([getS(), getSujetProposSaga()]);
}
