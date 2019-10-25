import fetchDb from "./fetchDb";

const archive = (dbName, e, ArchId, Sujet, Presentateur, date, Lien) => {
  //**************** */add
  e.preventDefault();

  return fetchDb(dbName + "/" + ++ArchId).set({
    id: ArchId,
    Sujet: Sujet,
    Presentateur: Presentateur,
    Date: date,
    Lien: Lien
  });
  // .then(u => {
  //   // this.setState({
  //   //   sujetAdded: true,
  //   //   message: "Ajouté avec succès"
  //   // });
  //   dispatch(added("archive", true, "archiver avec succes"));
  // })
  // .catch(e => {
  //   // this.setState({
  //   //   sujetAdded: false,
  //   //   message: "Erreur"
  //   // });
  //   dispatch(added("archive", true, "erreur"));
  // });

  // const ref = fetchDb(dbName);
  // ref && ref.child(presentateurId).remove();
};

export default archive;
