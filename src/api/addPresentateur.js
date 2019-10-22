import fetchDb from "./fetchDb";

const addPresentateur = (e, dbName, presentateurId, Nom, Prenom, Email) => {
  e.preventDefault();

  return fetchDb(dbName + "/" + ++presentateurId).set({
    Nom: Nom,
    Prenom: Prenom,
    Email: Email,
    id: presentateurId
  });
};

export default addPresentateur;
