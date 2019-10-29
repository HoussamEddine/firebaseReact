import fetchDb from "./fetchDb";

const fctGet = dbName => {
  const ref = fetchDb(dbName);
  const prom = new Promise(res => {
    ref &&
      ref.on("value", snapshot => {
        let payload, Id;
        payload = snapshot.val();
        if (payload.length) {
          Id = payload.length - 1;
        } else {
          for (let id in payload) {
            Id = id;
          }
        }

        res({ payload, Id });
      });
  });
  return prom;
  //return prom.then();
};

export default fctGet;
