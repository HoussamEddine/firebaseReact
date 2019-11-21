import { added } from "./added";
import deleteSPR from "./deleteAction";
import addAffect from "./../../api/addAffect";

const affectationAction = (
  e,
  dbName,
  dbNameS,
  sujetsPId,
  affectId,
  sujet,
  presentateur,
  date
) => {
  return dispatch => {
    e.preventDefault();
    addAffect(e, dbName, affectId, sujet, presentateur, date)
      .then(u => {
        dispatch(added("affectation", true, "Ajouté avec succès"));
        dispatch(deleteSPR(dbNameS, sujetsPId, dispatch));
      })

      .catch(e => {
        console.log(e);
        dispatch(added("affectation", false, "Erreur"));
      });
    //dispatch(deleteSPR(dbNameS, sujetsPId));
  };
};

export default affectationAction;
