import * as firebase from "./node_modules/firebase";

const config = {
  apiKey: "AIzaSyAN5vdoDiAV-6-ttm7RIpLEq72bH-inXhw",
  authDomain: "novelis-e814a.firebaseapp.com",
  databaseURL: "https://novelis-e814a.firebaseio.com",
  projectId: "novelis-e814a",
  storageBucket: "novelis-e814a.appspot.com",
  messagingSenderId: "482959103038",
  appId: "1:482959103038:web:093a0f37c3c8a49bfaed6f"
};

export default firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(config);
