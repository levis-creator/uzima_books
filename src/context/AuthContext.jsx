import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUiContext from "../hooks/useUiContext";
import { auth, db } from "../lib/firebase";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const { setAdmin, setLoading } = useUiContext();

  useEffect(() => {
    const checkIsLogin = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
          setIsLogin(true);
        } else {
          // set react state 'user' to null
          setIsLogin(false);
        }
      });
      // checking for admin
      const isAdmin = async () => {
        const adminRef = doc(db, "admins", currentUser.uid);
        const adminSnap = await getDoc(adminRef);
        if (adminSnap.exists()) {
          setAdmin(true);
          setLoading(false);
        } else {
          setAdmin(false);
          setLoading(false);
        }
      };
      isAdmin();
      // checking if user is logged in
    };

    checkIsLogin();
  }, [currentUser, setAdmin, setLoading]);
  // sign out function
  const signout = () => {
    signOut(auth).then(() => console.log("sign out successful"));
  };
  // sign in with google
  const googleSignin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider).then(() => navigate("/"));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isLogin, signout, currentUser, googleSignin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
