import update from "../../api/update";

const updateAction = (dbName, s, Id) => {
  return () => update(dbName, s, Id);
};

export default updateAction;
