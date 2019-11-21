import fctGet from "../../api/fctGet";

const getPresentateurs = () => {
  return dispatch => {
    let data = fctGet("Presentateurs");
    // console.log(data);
    data.then(data =>
      dispatch({
        type: "PRESENTATEURS_READY",
        payload: data.payload,
        presentateurId: data.Id
      })
    );
  };
};
export default getPresentateurs;
