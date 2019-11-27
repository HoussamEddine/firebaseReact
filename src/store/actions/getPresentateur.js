import fctGet from "../../api/fctPresentateur";
import {call ,put ,takeEvery} from "redux-saga/effects";

function fetchPresentateurApi(){
  return fctGet()
  .then(response => {
    return response;
  })
  .catch(error => ({ error }));
}
function* getPresentateurs(){
  try{
    const data = yield call(fetchPresentateurApi);
    yield put({type:"PRESENTATEURS_READY",data})
  }
  catch(error){
    yield put({ error });
  }
}
function* getPresentateursSaga(){
  yield takeEvery("PRESENTATEURS_REQUESTED",getPresentateurs);
}
export default getPresentateursSaga;
/*
const getPresentateurs = () => {
  return dispatch => {
    let data = fctGet();
    data.then(data =>
      dispatch({
        type: "PRESENTATEURS_READY",
        payload: data.payload,
        presentateurId: data.Id
      })
    );
  };
};
export default getPresentateurs;
*/