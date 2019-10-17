import fetchDb from "./fetchDb";

const update = (dbName, s, Id) => {
  const ref = fetchDb(dbName);
  let presentateurUp;
  if (dbName === "Presentateurs") {
    presentateurUp = {
      Nom: s.NewNom,
      Prenom: s.NewPrenom,
      Email: s.NewEmail
    };
  } else {
    presentateurUp = {
      Sujet: s.NewSujet,
      Presentateur: s.NewPresentateur,
      Date: s.NewDate
    };
  }

  ref && ref.child(Id).update(presentateurUp);
};

export default update;
