import fetchDb from "../api/fetchDb";

const fctSujetPropo = () => {
  const ref = fetchDb("Sujets");
  const prom = new Promise((res, rej) => {
    let data;
    ref &&
      ref.on("value", async snapshot => {
        let payload, sujetId;
        payload = await snapshot.val();
        if (payload.length) {
          sujetId = payload.length - 1;
        } else {
          for (let id in payload) {
            sujetId = id;
          }
        }
        data = { payload, sujetId };
        res(data);
      });
    // lmochkil kan hna : payload w sujetId bera ref.on() mam3arfinch donc had lfonction kant trad undefined , kan khasak diri return bera ref.on() walakin hna ghadi ti7i f lmochkil zawaj li howa ref.on() katchad lwa9t bach tamchi l base de donne 3ad traja3 les valeurs donc return kant tasba9 matji les valeurs yawaslo mn BD 7ta tkoun lfonction kamlat w raj3at undefined , rani creyit promise bach ysatana ta twsal les valeurs 3ad ydir dispatch f getSujetPropos
  });
  return prom;
};
export default fctSujetPropo;
