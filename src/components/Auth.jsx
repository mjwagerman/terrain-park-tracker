import { auth, googleProvider } from "../config/firebase";
import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";


const Auth = () => {
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
      <div className = "google-auth">
        <button onClick={signInWithGoogle}> Sign In With Google</button>
        <button onClick={logout}> Logout </button>
      </div>
    );
  };

  export default Auth;