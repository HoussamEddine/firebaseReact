import { addpres } from "./addpres";
import addPres from "../../api/addPres";

const addPresAction = (e, dbName, presId, nom, prenom, email) => {
  return dispatch => {
    addPres(e, dbName, presId, nom, prenom, email)
      .then(u => {
        dispatch(addpres("Presentateurs", true, "Ajouté avec succés"));
      })
      .catch(e => {
        dispatch(addpres("Presentateurs", false, "Erreur"));
      });
  };
};

export default addPresAction;
