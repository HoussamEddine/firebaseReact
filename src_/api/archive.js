import fetchDb from "./fetchDb";

const archive = (dbName, e, ArchId, Sujet, Presentateur, date, Lien, Lien2) => {
   // e.preventDefault();

  return fetchDb(dbName + "/" + ++ArchId).set({
    id: ArchId,
    Sujet: Sujet,
    Presentateur: Presentateur,
    Date: date,
    Lien: Lien,
    Lien2:Lien2
  });
 
};

export default archive;
