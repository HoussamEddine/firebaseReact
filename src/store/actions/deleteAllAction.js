import deleteA from "./../../api/deleteAll";
import getPresentateur from "./getPresentateur";
import getSujetProps from "./getSujetPropos";
import getSujetPlanif from "./getSujetPlanif";

const deleteSP = (dbName, Id, dispatch) => {
  return () => {
    deleteA(dbName, Id);
    if (dbName === "Sujets") {
      dispatch(getSujetProps());
    } else if (dbName === "Presentateurs") {
      dispatch(getPresentateur());
    } else {
      dispatch(getSujetPlanif());
    }
  };
};
export default deleteSP;


