import fetchDb from "./fetchDb";

const addPresentateur = (dbName, presentateurId, Nom, Prenom, Email) => {
  return fetchDb(dbName + "/" + ++presentateurId).set({
    id: presentateurId,
    Nom: Nom,
    Prenom: Prenom,
    Email: Email
  });
};

export default addPresentateur;
