import firebase from "./../../config/config";

const getSujets = () => {
  return dispatch => {
    let payload;
    const ref = firebase.database().ref("Sujets");
    ref &&
      ref.on("value", snapshot => {
        payload = snapshot.val();
        dispatch({ type: "DATA_READY", payload });
      });
  };
};

export default getSujets;
