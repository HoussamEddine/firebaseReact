import deleteA from "./../../api/delete";
import getPresentateur from "./getPresentateur";
import getSujetProps from "./getSujetPropos";
import getSujetArch from "./getSujetArch";
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
      // dispatch(getPresentateur());
    }
  };
};
export default deleteSP;
