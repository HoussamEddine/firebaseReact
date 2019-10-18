import { added } from "./added";

import fetchDb from "./../../api/fetchDb";

const addSujet = (e, dbName, sujetId, sujet) => {
  return dispatch => {
    e.preventDefault();

    fetchDb(dbName + "/" + ++sujetId)
      .set({
        Name: sujet,
        id: sujetId
      })
      .then(u => {
        dispatch(added("Sujets", true, "ajoute avec succes"));
      })
      .catch(e => {
        dispatch(added("Sujets", false, "erreur"));
      });
  };
};
export default addSujet;
