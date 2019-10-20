import fetchDb from "../../api/fetchDb";

import { added } from "./added";
import deleteSP from "./deleteAction";
const archiveAction = (
  e,
  dbName,
  dbNameS,
  presentateurId,
  ArchId,
  Sujet,
  Presentateur,
  date,
  Lien
) => {
  return dispatch => {
    e.preventDefault();

    fetchDb(dbName + "/" + ++ArchId)
      .set({
        id: ArchId,
        Sujet: Sujet,
        Presentateur: Presentateur,
        Date: date,
        Lien: Lien
      })
      .then(u => {
        dispatch(added("archive", true, "archiver avec succes"));
      })
      .catch(e => {
        dispatch(added("archive", true, "erreur"));
      });

    dispatch(deleteSP(dbNameS, presentateurId));
  };
};

export default archiveAction;
