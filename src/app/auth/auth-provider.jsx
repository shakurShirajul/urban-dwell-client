import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import auth from "@/shared/lib/firebase";
import { publicApi } from "@/shared/api/http-clients";
import { AuthContext } from "@/shared/contexts/auth-context";

const toastOptions = {
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  theme: "colored",
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback((email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signUp = useCallback((email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }, []);

  const googleSignIn = useCallback(() => {
    setLoading(true);
    return signInWithPopup(auth, new GoogleAuthProvider());
  }, []);

  const updateUser = useCallback((name, imageUrl) => updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: imageUrl,
  }), []);

  const logOut = useCallback(() => {
    setLoading(true);
    return signOut(auth);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      try {
        if (currentUser) {
          const response = await publicApi.post("/jwt", { email: currentUser.email });
          if (response.data.token) localStorage.setItem("access-token", response.data.token);
        } else {
          localStorage.removeItem("access-token");
        }
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const updateToast = useCallback((message) => toast.info(message, toastOptions), []);
  const successToast = useCallback((message) => toast.success(message, toastOptions), []);
  const errorToast = useCallback((message) => toast.error(message, toastOptions), []);

  const authInfo = useMemo(() => ({
    user,
    setUser,
    loading,
    setLoading,
    signIn,
    signUp,
    updateUser,
    googleSignIn,
    logOut,
    updateToast,
    successToast,
    errorToast,
  }), [user, loading, signIn, signUp, updateUser, googleSignIn, logOut, updateToast, successToast, errorToast]);

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
