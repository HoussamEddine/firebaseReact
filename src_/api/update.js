import fetchDb from "./fetchDb";

const update = (dbName, s, Id) => {
  const ref = fetchDb(dbName);
  let data;
  if (dbName === "Presentateurs") {
    data = {
      Nom: s.NewNom,
      Prenom: s.NewPrenom,
      Email: s.NewEmail
    };
  } else if (dbName === "Sujets") {
    data = {
      Name: s.NewSujet
    };
  } else {
    data = {
      Sujet: s.NewSujet,
      Presentateur: s.NewPresentateur,
      Date: s.NewDate
    };
  }

  ref && ref.child(Id).update(data);
};

export default update;
