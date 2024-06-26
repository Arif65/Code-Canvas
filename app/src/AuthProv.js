/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
  import { app } from "./firebase.config";
  
  export const AuthCon = createContext(null);
  
  const auth = getAuth(app);
  
  const googProv = new GoogleAuthProvider();
  
  const AuthProv = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading,setLoading]=useState(true);
  
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const signInWithGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googProv);
    };
  
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (newUser) => {
        setUser(newUser);
        setLoading(false);
      });
      return () => {
        unSubscribe();
      };
    }, []);
  
    const authInfo = { user,loading, createUser, signIn, logOut,signInWithGoogle };
  
    return <AuthCon.Provider value={authInfo}>{children}</AuthCon.Provider>;
  };
  
  export default AuthProv;