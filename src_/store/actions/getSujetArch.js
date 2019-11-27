import fctGet from "../../api/fctGet";

const getSujetsArch = () => {
  return dispatch => {
    let data = fctGet("Sujets_arch");
    data.then(data =>
      dispatch({
        type: "SUJETSARCH_READY",
        payload: data.payload,
        ArchId: data.Id
      })
    );
  };
};

export default getSujetsArch;
/** 
import { call,put } from 'redux-saga/effects';

function* getSujetsArch(){
  const sujetArch = yield call(fctGet,'Sujets_arch')
  yield put ({ type:'SUJETSARCH_READY',sujetArch })
}
export default getSujetsArch;
*/

/***n'importe quoi*/
/*function* changeColorSaga() {
  const action = yield take(CHOOSE_COLOR);
  yield put(changeUI(action.payload.color));
}*/