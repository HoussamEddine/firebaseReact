// import fetchDb from "../api/fetchDb";

// const fctSujetArch = () => {
//   const ref = fetchDb("Sujets_arch");
//   const promise = new Promise(dn => {
//     let data;
//     ref &&
//       ref.on("value", snapshot => {
//         let payload, ArchId;
//         payload = snapshot.val();
//         if (payload.length) {
//           ArchId = payload.length - 1;
//         } else {
//           for (let id in payload) {
//             ArchId = id;
//           }
//         }
//         data = { payload, ArchId };

//         dn(data);
//       });
//   });
//   return promise;
// };

// export default fctSujetArch;
