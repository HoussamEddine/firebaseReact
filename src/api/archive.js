import fetchDb from "./fetchDb";

import { added } from "../store/actions/added";

const archive = (
  dbName,
  e,
  presentateurId,
  ArchId,
  Sujet,
  Presentateur,
  Date,
  Lien,
  dispatch
) => {
  //**************** */add
  e.preventDefault();

  fetchDb(dbName + "/" + ++ArchId)
    .set({
      id: ArchId,
      Sujet: Sujet,
      Presentateur: Presentateur,
      Date: Date,
      Lien: Lien
      // lien: this.Lien,
    })
    .then(u => {
      // this.setState({
      //   sujetAdded: true,
      //   message: "Ajouté avec succès"
      // });
      dispatch(added("archive", true, "archiver avec succes"));
    })
    .catch(e => {
      // this.setState({
      //   sujetAdded: false,
      //   message: "Erreur"
      // });
      dispatch(added("archive", true, "erreur"));
    });

  //*****************delete */
  // if (pArr.length === 1) {
  //   // this.setState({
  //   //   message: "Vous ne pouvez pas supprimer la dérnière ligne"
  //   // });
  //   return;
  // }
  const ref = fetchDb(dbName);
  ref && ref.child(presentateurId).remove();
};

export default archive;
