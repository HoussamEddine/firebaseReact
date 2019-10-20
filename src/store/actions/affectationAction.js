import { added } from "./added";

import fetchDb from "./../../api/fetchDb";

const affectationAction = (e, dbName, affectId, sujet, presentateur, date) => {
  return dispatch => {
    e.preventDefault();
    fetchDb(dbName + "/" + ++affectId)
      .set({
        Sujet: sujet,
        Presentateur: presentateur,
        Date: date,
        id: affectId
      })
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
