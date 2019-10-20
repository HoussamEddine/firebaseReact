import { added } from "./added";

import fetchDb from "./../../api/fetchDb";

const addPresentateur = (e, dbName, presentateurId, Nom, Prenom, Email) => {
  return dispatch => {
    e.preventDefault();

    fetchDb(dbName + "/" + ++presentateurId)
      .set({
        Nom: Nom,
        Prenom: Prenom,
        Email: Email,
        id: presentateurId
      })
      .then(u => {
        dispatch(added("user", true, "ajoute avec succes"));
      })
      .catch(e => {
        console.log(e);
        dispatch(added("user", true, "erreur"));
      });
  };
};

export default addPresentateur;
