import fetchDb from "./fetchDb";

const addSujet = (dbName, sujetId, sujet) => {
  //e.preventDefault();

  return fetchDb(dbName + "/" + ++sujetId).set({
    Name: sujet,
    id: sujetId
  });
};
export default addSujet;
