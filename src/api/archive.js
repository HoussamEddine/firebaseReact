import fetchDb from "./fetchDb";

import { addedSucces } from "../store/actions/addedSucces";

const archive = (
  e,
  presentateurId,
  ArchId,
  Sujet,
  Presentateur,
  Date,
  Lien
) => {
  //**************** */add
  e.preventDefault();

  fetchDb("Sujets_arch/" + ++ArchId)
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
      addedSucces();
    })
    .catch(e => {
      // this.setState({
      //   sujetAdded: false,
      //   message: "Erreur"
      // });
    });

  //*****************delete */
  // if (pArr.length === 1) {
  //   // this.setState({
  //   //   message: "Vous ne pouvez pas supprimer la dérnière ligne"
  //   // });
  //   return;
  // }
  const ref = fetchDb("Sujets_pr");
  ref && ref.child(presentateurId).remove();
};

export default archive;
