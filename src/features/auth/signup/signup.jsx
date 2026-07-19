import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SignupForm from "./signup-form";
import AuthShell from "@/features/auth/auth-shell";

const Signup = () => (
  <AuthShell
    visualLabel="Begin your residency"
    visualTitle="A considered start to your next home."
    visualDescription="Create one resident profile, request an available apartment, and follow every step from review to move-in."
  >
    <Helmet><title>Create Account | Urban Dwell</title></Helmet>
    <div className="flex items-center justify-between gap-6">
      <p className="eyebrow text-primary">Create your account</p>
      <p className="text-sm text-base-content/55">Already a resident? <Link to="/login" className="font-bold text-primary hover:underline">Sign in</Link></p>
    </div>
    <h1 id="signup-title" className="mt-8 font-display text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">Join Urban Dwell.</h1>
    <p className="mt-4 max-w-md leading-7 text-base-content/60">Create your resident profile with an email you can access and a clear photo for your building record.</p>
    <div className="mt-10"><SignupForm /></div>
    <p className="mt-8 text-center text-xs leading-5 text-base-content/45">Your profile information is used only to manage your Urban Dwell residence.</p>
  </AuthShell>
);

export default Signup;
