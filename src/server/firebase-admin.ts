import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { requiredServerEnv } from "./env";

const getAdminApp = () => {
  if (getApps().length) return getApps()[0]!;

  return initializeApp({
    credential: cert({
      projectId: requiredServerEnv("FIREBASE_ADMIN_PROJECT_ID"),
      clientEmail: requiredServerEnv("FIREBASE_ADMIN_CLIENT_EMAIL"),
      privateKey: requiredServerEnv("FIREBASE_ADMIN_PRIVATE_KEY").replace(/\\n/g, "\n"),
    }),
  });
};

export const verifyFirebaseToken = (token: string) => getAuth(getAdminApp()).verifyIdToken(token);
