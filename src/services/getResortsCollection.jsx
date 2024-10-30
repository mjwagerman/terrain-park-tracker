// firestore.js or firebase.js
import { collection } from 'firebase/firestore';
import { db } from "../config/firebase"; // Assume you have initialized Firebase

export const resortsCollectionRef = collection(db, 'resorts');