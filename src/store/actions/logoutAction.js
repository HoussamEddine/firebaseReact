import firebase from "./../../config/config";
import { auth } from "./auth";

const logoutAction = e => {
  return dispatch => {
    e.preventDefault();

    firebase
      .auth()
      .signOut()
      .then(u => {
        dispatch(auth(false, null));
      })
      .catch(error => {
        dispatch(auth(true, error));
      });
  };
};
export default logoutAction;