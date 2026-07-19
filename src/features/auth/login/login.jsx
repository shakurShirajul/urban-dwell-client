import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "@/shared/contexts/auth-context";
import LoginForm from "./login-form";
import { publicApi } from "@/shared/api/http-clients";
import buildingSketch from "@/assets/banner/building-sketch.webp";

const Login = () => {
  const { googleSignIn, successToast } = useContext(AuthContext);
  const [socialError, setSocialError] = useState("");
  const [isGooglePending, setIsGooglePending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from?.pathname || "/";

  const navigateToPage = () => navigate(destination, { replace: true });

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
    <main className="grid min-h-screen place-items-center bg-base-200 px-4 py-8 sm:px-6 sm:py-12">
      <Helmet><title>Resident Sign In | Urban Dwell</title></Helmet>
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-base-content/10 bg-base-100 shadow-2xl lg:min-h-[42rem] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="architectural-grid relative hidden overflow-hidden bg-skyglass/45 p-10 lg:block">
          <p className="eyebrow relative z-10 text-steel">Resident access</p>
          <img src={buildingSketch} alt="" width="1600" height="1118" className="absolute inset-x-0 bottom-0 w-full mix-blend-multiply" />
          <p className="absolute bottom-10 left-10 z-10 max-w-sm font-display text-4xl font-semibold leading-tight tracking-tight text-steel">
            Everything about your home, in one calm place.
          </p>
        </div>

        <div className="flex items-center p-7 sm:p-12 lg:p-16">
          <div className="w-full">
            <p className="eyebrow text-primary">Welcome back</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Sign in to Urban Dwell.</h1>
            <p className="mt-4 text-base-content/60">Access payments, announcements, apartment details, and account information.</p>

            <div className="mt-9"><LoginForm navigateToPage={navigateToPage} /></div>

            <div className="my-7 flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-base-content/40">
              <span className="h-px flex-1 bg-base-content/10" /> or <span className="h-px flex-1 bg-base-content/10" />
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGooglePending}
              className="flex h-13 w-full items-center justify-center gap-3 rounded-full border border-base-content/15 bg-base-100 font-bold hover:bg-base-200 disabled:cursor-wait disabled:opacity-60"
            >
              <FcGoogle className="text-xl" aria-hidden="true" />
              {isGooglePending ? "Connecting to Google…" : "Continue with Google"}
            </button>
            {socialError ? <p role="alert" className="mt-3 text-sm font-medium text-error">{socialError}</p> : null}

            <p className="mt-8 text-center text-sm text-base-content/60">
              New to Urban Dwell? <Link to="/signup" className="font-bold text-primary hover:underline">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
