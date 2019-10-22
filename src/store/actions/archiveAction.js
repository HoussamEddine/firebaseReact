import archive from "./../../api/archive";

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

    archive(
      dbName,
      e,

      ArchId,
      Sujet,
      Presentateur,
      date,
      Lien
    )
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
