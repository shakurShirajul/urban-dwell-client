import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { HiOutlineBuildingOffice2, HiOutlineCheckCircle } from "react-icons/hi2";
import SignupForm from "./signup-form";

const benefits = ["Request an available apartment", "Receive building announcements", "Manage payments after approval"];

const Signup = () => (
  <main className="grid min-h-screen place-items-center bg-base-200 px-4 py-8 sm:px-6 sm:py-12">
    <Helmet><title>Create Account | Urban Dwell</title></Helmet>
    <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-base-content/10 bg-base-100 shadow-2xl lg:grid-cols-[0.8fr_1.2fr]">
      <aside className="bg-secondary p-8 text-secondary-content sm:p-12 lg:p-14">
        <HiOutlineBuildingOffice2 className="text-4xl text-accent" aria-hidden="true" />
        <p className="eyebrow mt-12 text-accent">Resident account</p>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-[-0.04em]">Start with an account. Choose a home when you are ready.</h1>
        <ul className="mt-10 space-y-4">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3 text-secondary-content/75">
              <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-xl text-accent" aria-hidden="true" /> {benefit}
            </li>
          ))}
        </ul>
      </aside>
      <section className="p-7 sm:p-12 lg:p-16" aria-labelledby="signup-title">
        <p className="eyebrow text-primary">Create your account</p>
        <h2 id="signup-title" className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em]">Tell us who you are.</h2>
        <p className="mt-3 text-base-content/60">Use an email you can access and a clear profile photo for your resident record.</p>
        <div className="mt-8"><SignupForm /></div>
        <p className="mt-7 text-center text-sm text-base-content/60">Already registered? <Link to="/login" className="font-bold text-primary hover:underline">Sign in</Link></p>
      </section>
    </div>
  </main>
);

export default Signup;
