import { addedSucces } from "../store/actions/addedSucces";
import { addedFail } from "../store/actions/addedFail";
import fetchDb from "./fetchDb";

const addUser = (e, dbName, presentateurId, Nom, Prenom, Email) => {
  e.preventDefault();

  fetchDb(dbName + "/" + ++presentateurId)
    .set({
      Nom: Nom,
      Prenom: Prenom,
      Email: Email,
      id: presentateurId
    })
    .then(u => {
      addedSucces();
    })
    .catch(e => {
      console.log(e);
      addedFail();
    });
};

export default addUser;
