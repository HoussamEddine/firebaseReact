/*import fetchDb from "../../api/fetchDb";

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
*/

import fctGet from "../../api/fctGet";

const getSujetsArch = () => {
  return dispatch => {
    let data = fctGet("Sujets_arch");
    data.then(data =>
      dispatch({
        type: "SUJETSARCH_READY",
        payload: data.payload,
        ArchId: data.Id
      })
    );
  };
};

export default getSujetsArch;
