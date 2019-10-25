import fctSujetPropo from "../../api/fctSujetPropo";

const getSujets = () => {
  return dispatch => {
    let data = fctSujetPropo();
    data.then(data =>
      dispatch({
        type: "DATA_READY",
        payload: data.payload,
        sujetId: data.sujetId
      })
    );
  };
};
export default getSujets;
