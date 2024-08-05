// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz3H696TsyF_BWyoo_9JQ1R0wdc9-Imuk",
  authDomain: "pantry-management-d227c.firebaseapp.com",
  projectId: "pantry-management-d227c",
  storageBucket: "pantry-management-d227c.appspot.com",
  messagingSenderId: "743033856428",
  appId: "1:743033856428:web:4c38ba5b81626cddee5a09",
  measurementId: "G-6D7VZ0NWS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)

export{firestore}