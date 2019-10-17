import fetchDb from "./fetchDb";

const update = (s, Id) => {
  let presentateurUp = {
    Sujet: s.NewSujet,
    Presentateur: s.NewPresentateur,
    Date: s.NewDate
  };

  const ref = fetchDb("Sujets_pr");
  ref && ref.child(Id).update(presentateurUp);
};

export default update;
