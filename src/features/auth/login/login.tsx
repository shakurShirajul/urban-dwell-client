"use client";


import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "@/shared/contexts/auth-context";
import LoginForm from "./login-form";
import { publicApi } from "@/shared/api/http-clients";
import AuthShell from "@/features/auth/auth-shell";

const Login = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("Login must be rendered within AuthProvider");
  const { googleSignIn, successToast } = authContext;
  const [socialError, setSocialError] = useState("");
  const [isGooglePending, setIsGooglePending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const destination = searchParams.get("next") || "/";

  const navigateToPage = () => router.replace(destination);

  const handleGoogleSignIn = async () => {
    setSocialError("");
    setIsGooglePending(true);
    try {
      const result = await googleSignIn();
      await publicApi.post("/users", {
        email: result.user.email,
        name: result.user.displayName,
        image: result.user.photoURL,
      });
      successToast("Signed in successfully");
      navigateToPage();
    } catch {
      setSocialError("Google sign-in could not be completed. Try again or use your email.");
    } finally {
      setIsGooglePending(false);
    }
  };

  return (
    <AuthShell
      visualLabel="Resident portal"
      visualTitle="Your home, handled with clarity."
      visualDescription="Pay rent, review your apartment details, and stay current with every building announcement from one calm workspace."
    >
      <div className="flex items-center justify-between gap-6">
        <p className="eyebrow text-primary">Resident access</p>
        <p className="text-sm text-base-content/55">New here? <Link href="/signup" className="font-bold text-primary hover:underline">Create account</Link></p>
      </div>
      <h1 className="mt-8 font-display text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">Welcome home.</h1>
      <p className="mt-4 max-w-md leading-7 text-base-content/60">Sign in to manage your residence, payments, and building updates.</p>

      <div className="mt-10"><LoginForm navigateToPage={navigateToPage} /></div>

      <div className="my-7 flex items-center gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-base-content/35">
        <span className="h-px flex-1 bg-base-content/10" /> or continue with <span className="h-px flex-1 bg-base-content/10" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isGooglePending}
        className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-base-content/15 bg-base-100 font-bold transition-colors hover:bg-base-200 disabled:cursor-wait disabled:opacity-60"
      >
        <FcGoogle className="text-xl" aria-hidden="true" />
        {isGooglePending ? "Connecting to Google…" : "Continue with Google"}
      </button>
      {socialError ? <p role="alert" className="mt-3 text-sm font-medium text-error">{socialError}</p> : null}

      <p className="mt-10 text-center text-xs leading-5 text-base-content/45">By continuing, you agree to use the resident portal responsibly and keep your account secure.</p>
    </AuthShell>
  );
};

export default Login;
