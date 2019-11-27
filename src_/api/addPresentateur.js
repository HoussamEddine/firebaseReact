import fetchDb from "./fetchDb";

const addPresentateur = (e, dbName, presentateurId, Nom, Prenom, Email) => {
  e.preventDefault();

  return fetchDb(dbName + "/" + ++presentateurId).set({
    id: presentateurId,
    Nom: Nom,
    Prenom: Prenom,
    Email: Email
    
  });
};

export default addPresentateur;
