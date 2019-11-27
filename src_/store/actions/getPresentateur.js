import fctGet from "../../api/fctPresentateur";

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
/** 
import {call,put } from 'redux-saga/effects';
import fctGet from "../../api/fctPresentateur";

function* getPresentateurs(){
  const presentateur = yield call(fctGet)
  yield put({type:'PRESENTATEURS_READY', presentateur})
}
export default getPresentateurs;
*/