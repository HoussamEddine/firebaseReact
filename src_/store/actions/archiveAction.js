import archive from "./../../api/archive";

import { added } from "./added";
import deleteSP from "./deleteAction";
import getSujetPlanif from "./getSujetPlanif";
const archiveAction = (
  e,
  dbName,
  dbNameS,
  presentateurId,
  ArchId,
  Sujet,
  Presentateur,
  date,
  Lien,
  Lien2
) => {
  return dispatch => {
    e.preventDefault();

    archive(dbName, e, ArchId, Sujet, Presentateur, date, Lien, Lien2)
      .then(u => {
        dispatch(added("archive", true, " "));
        dispatch(deleteSP(dbNameS, presentateurId, dispatch));
        dispatch(getSujetPlanif());
      })
      .catch(e => {
        dispatch(added("archive", false, "Erreur"));
      });
  };
};

export default archiveAction;
