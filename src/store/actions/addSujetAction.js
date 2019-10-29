import { added } from "./added";
import addSujet from "./../../api/addSujet";
import getSujetPropos from "./getSujetPropos";

const addSujetAction = (e, dbName, sujetId, sujet) => {
  return dispatch => {
    addSujet(e, dbName, sujetId, sujet)
      .then(u => {
        dispatch(added("Sujets", true, "Ajouté avec Succès"));
        dispatch(getSujetPropos());
      })
      .catch(e => {
        dispatch(added("Sujets", false, "Erreur"));
      });
  };
};
export default addSujetAction;
