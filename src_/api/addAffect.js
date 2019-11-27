import fetchDb from "./fetchDb";

const addAffect = (e, dbName, affectId, sujet, presentateur, date) => {
 // e.preventDefault();
  
  return fetchDb(dbName + "/" + ++affectId).set({
    Sujet: sujet,
    Presentateur: presentateur,
    Date: date,
    id: affectId
  });
};

export default addAffect;
