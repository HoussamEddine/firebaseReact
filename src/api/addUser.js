import { added } from "../store/actions/added";

import fetchDb from "./fetchDb";

const addUser = (e, dbName, presentateurId, Nom, Prenom, Email, dispatch) => {
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

export default addUser;
