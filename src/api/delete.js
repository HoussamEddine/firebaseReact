import fetchDb from "./fetchDb";

const deleteElem = Id => {
  // if (pArr.length === 1) {
  //   this.setState({
  //     message: "Vous ne pouvez pas supprimer la dérnière ligne"
  //   });
  //   return;
  // }
  const ref = fetchDb("Sujets_pr");
  ref && ref.child(Id).remove();
};
export default deleteElem;
