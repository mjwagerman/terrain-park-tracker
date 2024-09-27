// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJR-Zq_idhVYap-r_DnH3MEbQD7o3ZrNc",
  authDomain: "terrain-park-tracker.firebaseapp.com",
  projectId: "terrain-park-tracker",
  storageBucket: "terrain-park-tracker.appspot.com",
  messagingSenderId: "211134185538",
  appId: "1:211134185538:web:ee88526a884b49cca26ddb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);