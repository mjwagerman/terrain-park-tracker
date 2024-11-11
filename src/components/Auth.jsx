import { auth, googleProvider } from "../config/firebase";
import { useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";


const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set isLoggedIn to true if user exists, otherwise false
    });
    return unsubscribe;
  }, []);

    const signInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (err) {
        console.error(err);
      }
    };
  
    const logout = async () => {
      try {
        await signOut(auth);
        console.log("logged out");
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <div className="auth">
        {!isLoggedIn ? (
        <button onClick={signInWithGoogle} className="log-in-btn"> Sign In With Google</button>
      ) : (
        <button onClick={logout} className="log-out-btn"> Logout </button>
      )}
      </div>
    );
  };

  export default Auth;