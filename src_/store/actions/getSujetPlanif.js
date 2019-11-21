import fctGet from "../../api/fctGet";

const getSujetPlanif = () => {
  return dispatch => {
    let data = fctGet("Sujets_pr");
    data.then(data =>
      dispatch({
        type: "SUJETSPL_READY",
        payload: data.payload,
        affectId: data.Id
      })
    );
  };
};
export default getSujetPlanif;
