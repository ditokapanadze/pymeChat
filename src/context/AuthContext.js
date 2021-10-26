import React, { useContext, useState, useEffect, createContext } from "react";
import Signup from "../components/Signup";
import { auth } from "../firebase";

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      setLoading(false);
    });
    return unsubscribe;
  }, []);

  function logout() {
    return auth.signOut();
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const value = {
    currentUser,
    logout,
    signup,
    login,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
