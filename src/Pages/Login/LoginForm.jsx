import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";

const LoginForm = ({ navigateToPage }) => {
  const { signIn, successToast, errorToast } = useContext(AuthContext);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((userCredential) => {
        successToast("Login Successful");
        navigateToPage();
      })
      .catch((error) => {
        errorToast("You have entered an invalid username or password");
        console.log(error.code, error.message);
      });
  };

  return (
    <div className="font-poppins">
      <div>
        <form className="space-y-3" onSubmit={handleFormSubmit}>
          <div className="space-y-1 text-base mt-5">
            <label className="block text-lg">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 shadow-sm"
            />
          </div>
          <div className="space-y-1 text-base">
            <label htmlFor="password" className="block text-lg">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600 shadow-sm"
            />
          </div>
          <button className="block w-full p-3 text-center rounded-md text-base-content bg-primary">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
