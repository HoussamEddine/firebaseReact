import fetchDb from "../../api/fetchDb";

const getSujetsPl = () => {
  return dispatch => {
    let payload, affectId;
    const ref = fetchDb("Sujets_pr");
    ref &&
      ref.on("value", snapshot => {
        payload = snapshot.val();
        if (payload.length) {
          affectId = payload.length - 1;
        } else {
          for (let id in payload) {
            affectId = id;
          }
        }
        dispatch({ type: "SUJETSPL_READY", payload, affectId: affectId });
      });
  };
};

export default getSujetsPl;
