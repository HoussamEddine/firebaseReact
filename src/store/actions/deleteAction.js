import fetchDb from "./../../api/fetchDb";

const deleteSP = (dbName, Id) => {
  return () => {
    const ref = fetchDb(dbName);
    ref && ref.child(Id).remove();
  };
};
export default deleteSP;
