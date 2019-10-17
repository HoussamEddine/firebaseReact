import fetchDb from "./../../api/fetchDb";

const getPresentateurs = () => {
  return dispatch => {
    let payload, presentateurId;
    const ref = fetchDb("Presentateurs");
    ref &&
      ref.on("value", snapshot => {
        payload = snapshot.val();
        if (payload.length) {
          presentateurId = payload.length - 1;
        } else {
          for (let id in payload) {
            presentateurId = id;
          }
        }
        dispatch({
          type: "PRESENTATEURS_READY",
          payload,
          presentateurId: presentateurId
        });
      });
  };
};

export default getPresentateurs;
