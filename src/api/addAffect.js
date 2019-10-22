import fetchDb from "./fetchDb";

const addAffect = (e, dbName, affectId, sujet, presentateur, date) => {
  e.preventDefault();
  return fetchDb(dbName + "/" + ++affectId).set({
    Sujet: sujet,
    Presentateur: presentateur,
    Date: date,
    id: affectId
  });
  // .then(u => {
  //   dispatch(added("affectation", true, "ajoute avec succes"));
  // })
  // .catch(e => {
  //   console.log(e);
  //   dispatch(added("affectation", false, "erreur"));
  // });
};

export default addAffect;
