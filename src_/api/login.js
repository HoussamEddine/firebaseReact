import firebase from "./../config/config";
import { auth } from "./../store/actions/auth";

const login = (e, email, password, dispatch) => {
  e.preventDefault();

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(u => {
      dispatch(auth(true, null));
    })
    .catch(error => {
      dispatch(auth(false, error));
    });
};
export default login;
