import fetchDb from "./fetchDb";

const deleteElem = (dbName, Id) => {
  const ref = fetchDb(dbName);
  ref && ref.child(Id).remove();
};
export default deleteElem;
