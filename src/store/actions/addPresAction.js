import { addpres } from "./addpres";
import addPres from "../../api/addPres";

const addPresAction = (e, dbName, presId, nom, prenom, email) => {
  return dispatch => {
    addPres(e, dbName, presId, nom, prenom, email)
      .then(u => {
        dispatch(addpres("Presentateurs", true, "Ajouté avec succès"));
      })
      .catch(e => {
        dispatch(addpres("Presentateurs", false, "Erreur"));
      });
  };
};

export default addPresAction;
/** 
 import {put,call} from 'redux-saga/effects'
function* addPresAction(e, dbName, presId , nom,prenom, email){
  yield all =>{
    addPres(e, dbName,presId,nom ,prenom ,email)
    .then(u => {
      yield put(addPres("Presentateurs", true,"Ajouté avec succès"));
    })
    .catch(e => {
      yield put(addPres("Presentateur",false , "Erreur"));
    })
  }
}
export default addPresAction;*/
