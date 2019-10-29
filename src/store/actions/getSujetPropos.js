import fctGet from "../../a../../api/fctGet";

const getSujets = () => {
  return dispatch => {
    let data = fctGet("Sujets");
    // console.log(data);
    data.then(data => {
      dispatch({
        type: "DATA_READY",
        payload: data.payload,
        sujetId: data.Id
      });
    });
    // fctSujetPropo(dispatch);
  };
};
export default getSujets;
