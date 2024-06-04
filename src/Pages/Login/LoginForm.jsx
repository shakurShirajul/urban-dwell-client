import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';

const LoginForm = () => {
    const { signIn, successToast, errorToast } = useContext(AuthContext);
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signIn(email, password)
            .then((userCredential) => {
                successToast("Login Successful");
                navigateToPage();
            })
            .catch((error) => {
                errorToast('You have entered an invalid username or password');
                console.log(error.code, error.message);
            })
    }
    return (
        <div>
            <div>
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div className="space-y-1 text-sm">
                        <label className="block text-lg dark:text-gray-600">Email</label>
                        <input type="email" name="email" id="email" placeholder="example@gmail.com" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block text-lg dark:text-gray-600">Password</label>
                        <input type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                        {/* <div className="flex justify-end text-xs dark:text-gray-600">
                                    <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                                </div> */}
                    </div>
                    <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600">Sign in</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;