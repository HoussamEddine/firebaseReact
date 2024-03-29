// export const added = (name, bool, message) => {
//   return dispatch => {
//     dispatch({
//       type: "ADDED_STATE",
//       added: bool,
//       name: name,
//       message: message
//     });
//   };
// };
import { delay, put, takeEvery } from "redux-saga/effects";
function* added(msg) {
  yield put({
    type: "ADDED_STATE",
    added: msg.msg.bool,
    name: msg.msg.name,
    message: msg.msg.msg
  });
  yield delay(3000);

  yield put({
    type: "ADDED_STATE",
    added: true,
    name: "",
    message: ""
  });
}
function* readyMessage() {
  yield takeEvery("READY_MESSAGE", added);
}

export default readyMessage;
