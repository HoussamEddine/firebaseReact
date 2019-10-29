import update from "../../api/update";
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
    } else {
      dispatch(getSujetPlanif());
      // dispatch(getPresentateur());
    }
  };
};

export default updateAction;
