"use client";


import { createContext } from "react";
import type { User, UserCredential } from "firebase/auth";

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  googleSignIn: () => Promise<UserCredential>;
  updateUser: (name: string, imageUrl: string) => Promise<void>;
  logOut: () => Promise<void>;
  updateToast: (message: string) => void;
  successToast: (message: string) => void;
  errorToast: (message: string) => void;
}

export const AuthContext = createContext<AuthContextValue>(undefined as unknown as AuthContextValue);
