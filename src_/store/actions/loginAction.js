import firebase from "./../../config/config";
import { auth } from "./auth";

const loginAction = (e, email, password) => {
  return dispatch => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(u => {
        dispatch(auth(true, null));
        console.log("dispatch login true");
      })
      .catch(error => {
        dispatch(auth(false, error));
        console.log("dispatch login false");
      });
  };
};
export default loginAction;
