import fetchDb from "./fetchDb";

const deleteElem = (dbName, Id) => {
  // if (pArr.length === 1) {
  //   this.setState({
  //     message: "Vous ne pouvez pas supprimer la dérnière ligne"
  //   });
  //   return;
  // }
  const ref = fetchDb(dbName);
  ref && ref.child(Id).remove();
};
export default deleteElem;
