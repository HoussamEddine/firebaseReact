// import fetchDb from "../api/fetchDb";

// const fctSujetPlanif = () => {
//   const ref = fetchDb("Sujets_pr");
//   const promise = new Promise(dn => {
//     let data;
//     ref &&
//       ref.on("value", snapshot => {
//         let payload, affectId;
//         payload = snapshot.val();
//         if (payload.length) {
//           affectId = payload.length - 1;
//         } else {
//           for (let id in payload) {
//             affectId = id;
//           }
//         }
//         data = { payload, affectId };
//         dn(data);
//       });
//   });
//   return promise.then();
// };

// export default fctSujetPlanif;
