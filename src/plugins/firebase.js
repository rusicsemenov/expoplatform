import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1x0m5B6H7z4xQFr6X7L3q2xnAuBslllA",
  authDomain: "vialan-expoplatform.firebaseapp.com",
  databaseURL: "https://vialan-expoplatform.firebaseio.com",
  projectId: "vialan-expoplatform",
  storageBucket: "vialan-expoplatform.appspot.com",
  messagingSenderId: "760182459729",
  appId: "1:760182459729:web:7ffe70226c278b9da1d770",
  measurementId: "G-MDYCEQCMEC"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
