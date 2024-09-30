import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";



export const getResorts = async () => {
    const resortsCollectionRef = collection(db, "resorts");
    const data = await getDocs(resortsCollectionRef);
    
    return data.docs.map((doc) => ({
      ...doc.data(), 
      id: doc.id,
    }));
  };