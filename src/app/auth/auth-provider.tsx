"use client";


import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { User } from "firebase/auth";
import { toast } from "react-toastify";
import auth from "@/shared/lib/firebase";
import { AuthContext } from "@/shared/contexts/auth-context";

const toastOptions = {
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  theme: "colored",
};

const syncServerSession = async (user: User): Promise<void> => {
  const idToken = await user.getIdToken();
  const response = await fetch("/api/session", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  if (!response.ok) throw new Error("Unable to create secure server session");
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const credential = await signInWithEmailAndPassword(auth, email, password);
    await syncServerSession(credential.user);
    return credential;
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await syncServerSession(credential.user);
    return credential;
  }, []);

  const googleSignIn = useCallback(async () => {
    setLoading(true);
    const credential = await signInWithPopup(auth, new GoogleAuthProvider());
    await syncServerSession(credential.user);
    return credential;
  }, []);

  const updateUser = useCallback(async (name: string, imageUrl: string) => {
    if (!auth.currentUser) throw new Error("No authenticated user");
    await updateProfile(auth.currentUser, { displayName: name, photoURL: imageUrl });
    await syncServerSession(auth.currentUser);
  }, []);

  const logOut = useCallback(async () => {
    setLoading(true);
    await signOut(auth);
    await fetch("/api/session", { method: "DELETE" });
    router.refresh();
  }, [router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      try {
        if (currentUser) {
          await syncServerSession(currentUser);
        } else {
          await fetch("/api/session", { method: "DELETE" });
        }
      } finally {
        setLoading(false);
        router.refresh();
      }
    });
    return unsubscribe;
  }, [router]);

  const updateToast = useCallback((message: string) => toast.info(message, toastOptions), []);
  const successToast = useCallback((message: string) => toast.success(message, toastOptions), []);
  const errorToast = useCallback((message: string) => toast.error(message, toastOptions), []);

  const authInfo = useMemo(() => ({
    user,
    loading,
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

export default AuthProvider;
