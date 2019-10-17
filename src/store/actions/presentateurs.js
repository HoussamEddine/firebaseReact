import fetchDb from "./../../api/fetchDb";

const getPresentateurs = () => {
  return dispatch => {
    let payload;
    const ref = fetchDb("Presentateurs");
    ref &&
      ref.on("value", snapshot => {
        payload = snapshot.val();
        dispatch({ type: "PRESENTATEURS_READY", payload });
      });
  };
};

export default getPresentateurs;
