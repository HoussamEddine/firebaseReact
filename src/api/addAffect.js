import { added } from "../store/actions/added";

import fetchDb from "./fetchDb";

const addAffect = (
  e,
  dbName,
  affectId,
  sujet,
  presentateur,
  date,
  dispatch
) => {
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

export default addAffect;
