import deleteA from "./../../api/delete";

const deleteSP = (dbName, Id) => {
  return () => deleteA(dbName, Id);
};
export default deleteSP;
