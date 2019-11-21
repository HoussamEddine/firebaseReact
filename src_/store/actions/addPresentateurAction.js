import { added } from "./added";

import addPresentateur from "./../../api/addPresentateur";
import getPresentateur from "./getPresentateur";

const addPresentateurAction = (
  e,
  dbName,
  presentateurId,
  Nom,
  Prenom,
  Email
) => {
  return dispatch => {
    e.preventDefault();

    addPresentateur(e, dbName, presentateurId, Nom, Prenom, Email)
      .then(u => {
        dispatch(added("user", true, "Ajouté avec succès "));
        dispatch(getPresentateur());
      })
      .catch(e => {
        console.log(e);
        dispatch(added("user", false, "Erreur"));
      });
  };
};

export default addPresentateurAction;
