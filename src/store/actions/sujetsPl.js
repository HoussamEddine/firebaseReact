import fetchDb from "./../../api/fetchDb";

const getSujetsPl = () => {
  return dispatch => {
    let payload;
    const ref = fetchDb("Sujets_pr");
    ref &&
      ref.on("value", snapshot => {
        payload = snapshot.val();

        dispatch({ type: "SUJETSPL_READY", payload });
      });
  };
};

export default getSujetsPl;
