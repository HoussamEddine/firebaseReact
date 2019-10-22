import { added } from "./added";

import addPresentateur from "./../../api/addPresentateur";

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
        dispatch(added("user", true, "ajoute avec succes"));
      })
      .catch(e => {
        console.log(e);
        dispatch(added("user", true, "erreur"));
      });
  };
};

export default addPresentateurAction;
