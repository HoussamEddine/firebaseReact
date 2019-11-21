// import fetchDb from "../api/fetchDb";

// const fctPresentateur = () => {
//   const ref = fetchDb("Presentateurs");
//   const promise = new Promise(res => {
//     let data;
//     ref &&
//       ref.on("value", snapshot => {
//         let payload, presentateurId;
//         payload = snapshot.val();
//         if (payload.length) {
//           presentateurId = payload.length - 1;
//         } else {
//           for (let id in payload) {
//             presentateurId = id;
//           }
//         }
//         data = { payload, presentateurId };
//         res(data);
//       });
//   });
//   return promise;
// };
// export default fctPresentateur;

// /**import fetchDb from "../api/fetchDb";

// const fctPresentateur =() =>{

// const ref = fetchDb("Presentateurs");
// let payload, presentateurId ,data;
// const promise= new Promise((res) =>{

//     ref &&
//     ref.on("value", async snapshot =>{

//         payload = await snapshot.val()});
//     });

//         promise.then(u=>{
//         if (payload.length){
//             presentateurId=payload.length - 1;
//         }
//         else{
//             for(let id in payload){
//                 presentateurId = id;
//             }
//         }
//         data = { payload, presentateurId};
//         })

// return promise.then(data);

// };

// export default fctPresentateur;
//  */
