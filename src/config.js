//  export default {
//     apiKey: "AIzaSyCqZdb9kAcU83wlug0GMl8Pq4HJU50S-_Q",
//     authDomain: "novelis-54e89.firebaseapp.com",
//     databaseURL: "https://novelis-54e89.firebaseio.com",
//   };

import * as firebase from "firebase";

const Config = {
  apiKey: "AIzaSyAexOwwqf8cKkGYbpjFFrOMXLr3IWxrKkg",
  authDomain: "fir-51486.firebaseapp.com",
  databaseURL: "https://fir-51486.firebaseio.com",
  projectId: "fir-51486",
  storageBucket: "fir-51486.appspot.com",
  messagingSenderId: "272002225348",
  appId: "1:272002225348:web:95a76bbf327849b8b6e591"
};

export default !firebase.apps.length
  ? firebase.initializeApp(Config)
  : firebase.app();
