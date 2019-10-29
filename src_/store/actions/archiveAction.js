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
  Lien,
  Lien2
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
      Lien,
      Lien2
    )
      .then(u => {
        dispatch(added("archive", true, "Archivé avec succès "));
      })
      .catch(e => {
        dispatch(added("archive", true, "Erreur"));
      });

    dispatch(deleteSP(dbNameS, presentateurId));
  };
};

export default archiveAction;
