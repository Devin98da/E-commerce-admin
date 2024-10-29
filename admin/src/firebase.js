// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuqKpOjEU9T0IU6kyigVLR-7kgVTDo1bY",
  authDomain: "react-14d1d.firebaseapp.com",
  databaseURL: "https://react-14d1d-default-rtdb.firebaseio.com",
  projectId: "react-14d1d",
  storageBucket: "react-14d1d.appspot.com",
  messagingSenderId: "137299988667",
  appId: "1:137299988667:web:119cdcd0969fc01c1d999e",
  measurementId: "G-VP8BZMG4JY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;