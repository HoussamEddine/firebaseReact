// import { added } from "../store/actions/added";

import fetchDb from "./fetchDb";

const addSujet = (e, dbName, sujetId, sujet) => {
  e.preventDefault();

  return fetchDb(dbName + "/" + ++sujetId).set({
    Name: sujet,
    id: sujetId
  });
  // .then(u => {
  //   dispatch(added("Sujets", true, "ajoute avec succes"));
  // })
  // .catch(e => {
  //   dispatch(added("Sujets", false, "erreur"));
  // });
};
export default addSujet;
