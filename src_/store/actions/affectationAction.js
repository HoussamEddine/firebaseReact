import { added } from "./added";

import addAffect from "./../../api/addAffect";

const affectationAction = (e, dbName, affectId, sujet, presentateur, date) => {
  return dispatch => {
    e.preventDefault();
    addAffect(e, dbName, affectId, sujet, presentateur, date)
      .then(u => {
        dispatch(added("affectation", true, "ajoute avec succes"));
      })
      .catch(e => {
        console.log(e);
        dispatch(added("affectation", false, "erreur"));
      });
  };
};

export default affectationAction;
