import firebase from "../../config/config";

const getSujetsArch = () => {
  return dispatch => {
    let payload;
    const ref = firebase.database().ref("Sujets_arch");
    ref &&
      ref.on("value", snapshot => {
        payload = snapshot.val();
        dispatch({ type: "SUJETSARCH_READY", payload });
      });
  };
};

export default getSujetsArch;
