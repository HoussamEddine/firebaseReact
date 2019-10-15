import firebase from "../../config/config";

const getSujetsPl = () => {
  return dispatch => {
    let payload;
    const ref = firebase.database().ref("Sujets_pr");
    ref &&
      ref.on("value", snapshot => {
        payload = snapshot.val();
        console.log(payload, "payload");
        dispatch({ type: "SUJETSPL_READY", payload });
      });
  };
};

export default getSujetsPl;
