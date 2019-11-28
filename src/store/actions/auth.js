// export const auth = (bool, err) => {
//   return dispatch => {
//     dispatch({
//       type: "AUTH",
//       isAuth: bool,
//       error: err
//     });
//   };
// };
import { put, takeEvery } from "redux-saga/effects";
function* auth(bool, err) {
  yield put({ type: "AUTH", isAuth: bool, error: err });
}
// function* authRequested() {
//   yield takeEvery("AUTH_REAQUESTED", auth);
// }
export default auth;
