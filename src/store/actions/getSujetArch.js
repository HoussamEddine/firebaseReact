import fetchDb from "../../api/fetchDb";

const getSujetsArch = () => {
  return dispatch => {
    let payload, ArchId;
    const ref = fetchDb("Sujets_arch");
    ref &&
      ref.on("value", snapshot => {
        payload = snapshot.val();
        if (payload.length) {
          ArchId = payload.length - 1;
        } else {
          for (let id in payload) {
            ArchId = id;
          }
        }
        dispatch({ type: "SUJETSARCH_READY", payload, ArchId: ArchId });
      });
  };
};

export default getSujetsArch;
