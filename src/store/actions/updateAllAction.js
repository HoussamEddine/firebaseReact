import update from "../../api/updateAll";
import getPresentateur from "./getPresentateur";
import getSujetProps from "./getSujetPropos";
import getSujetArch from "./getSujetArch";
import getSujetPlanif from "./getSujetPlanif";

const updateAction = (dbName, s, Id, dispatch) => {
  return () => {
    update(dbName, s, Id);
    if (dbName === "Sujets") {
      dispatch(getSujetProps());
    } else if (dbName === "Presentateurs") {
      dispatch(getPresentateur());
    } else if (dbName === "Sujets_pr"){
      dispatch(getSujetPlanif());
    }
  };
};

export default updateAction;

