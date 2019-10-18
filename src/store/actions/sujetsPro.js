import fetchDb from "./../../api/fetchDb";

const getSujets = () => {
  return dispatch => {
    let payload, sujetId;
    const ref = fetchDb("Sujets");
    ref &&
      ref.on("value", snapshot => {
        payload = snapshot.val();
        if (payload.length) {
          sujetId = payload.length - 1;
        } else {
          for (let id in payload) {
            sujetId = id;
          }
        }
        dispatch({ type: "DATA_READY", payload, sujetId: sujetId });
      });
  };
};

export default getSujets;
