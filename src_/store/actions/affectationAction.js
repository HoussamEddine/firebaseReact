import { added } from "./addedMsg";
import deleteSPR from "./deleteAllAction";
import addAffect from "./../../api/addAffect";

const affectationAction = (
  e,
  dbName,
  dbNameS,
  sujetsPId,
  affectId,
  sujet,
  presentateur,
  date
) => {
  return dispatch => {
    e.preventDefault();
    addAffect(e, dbName, affectId, sujet, presentateur, date)
      .then(u => {
        dispatch(added("affectation", true, "Ajouté avec succès"));
        dispatch(deleteSPR(dbNameS, sujetsPId, dispatch));
      })

      .catch(e => {
        console.log(e);
        dispatch(added("affectation", false, "Erreur"));
      });
  };
};
export default affectationAction;
/** 
import {put } from 'redux-saga/effects';
function* affectation(e,dbName,dbNameS,sujetsPId,affectId,sujet,presentateur,date){
  yield (e.preventDefault(),
         addAffect(e,dbName,affectId,sujet,presentateur,date)
         .then(u=>{
           yield put(added("affectation",true,"Ajouté avec succès"));
           yield put(deleteSPR(dbNameS,sujetsPId, dispatch));
         })
         .catch(e => {
           console.log(e);
           dispatch(added("affectation", false, "Erreur"));
         })
  )

}*/


