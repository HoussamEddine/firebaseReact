import { added } from "./added";
import addSujet from "./../../api/addSujet";

// import fetchDb from "./../../api/fetchDb";

const addSujetAction = (e, dbName, sujetId, sujet) => {
  return dispatch => {
    addSujet(e, dbName, sujetId, sujet)
      .then(u => {
        dispatch(added("Sujets", true, "ajoute avec succes"));
      })
      .catch(e => {
        dispatch(added("Sujets", false, "erreur"));
      });
  };
};
export default addSujetAction;
