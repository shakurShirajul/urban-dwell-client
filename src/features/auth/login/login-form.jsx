import { useContext, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi2";
import PropTypes from "prop-types";
import { AuthContext } from "@/shared/contexts/auth-context";

const LoginForm = ({ navigateToPage }) => {
  const { signIn, successToast } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const form = event.currentTarget;

    try {
      await signIn(form.email.value, form.password.value);
      successToast("Signed in successfully");
      navigateToPage();
    } catch {
      setError("Email or password is incorrect. Check both fields and try again.");
      form.password.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleFormSubmit} noValidate>
      <div>
        <label htmlFor="login-email" className="mb-2 block text-sm font-bold">Email address</label>
        <input
          id="login-email"
          type="email"
          name="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="you@example.com…"
          required
          className="field-control"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="mb-2 block text-sm font-bold">Password</label>
        <input
          id="login-password"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password…"
          required
          className="field-control"
        />
      </div>

      {error ? (
        <p className="rounded-xl bg-error/10 px-4 py-3 text-sm font-medium text-error" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-content transition-colors hover:bg-secondary disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? "Signing in…" : "Sign in to your dashboard"}
        {!isSubmitting ? <HiOutlineArrowRight aria-hidden="true" /> : null}
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  navigateToPage: PropTypes.func.isRequired,
};

export default LoginForm;
