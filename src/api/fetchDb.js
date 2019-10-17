import firebase from "../config/config";

const fetchDb = name => {
  return firebase.database().ref(name.toString());
};

export default fetchDb;
