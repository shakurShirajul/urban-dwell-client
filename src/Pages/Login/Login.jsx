import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import LoginForm from "./LoginForm";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { ToastContainer } from "react-toastify";

const Login = () => {

    const { googleSignIn, errorToast, successToast } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const from = location.state?.from?.pathname || "/";

    const navigateToPage = () => {
        setTimeout(() => {
            navigate(from, { replace: true });
        }, 2000);
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                axiosPublic.post(`/users`, {
                    email: result.user.email,
                    name: result.user.displayName,
                    image: result.user.photoURL,
                }, { withCredentials: true })
                successToast('LOGIN SUCCESSFUL')
                navigateToPage();
            })
            .catch((error) => {
                errorToast(error.message)
                console.log('Error', error.message);
            })
    }

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Login | Urban Dwell</title>
            </Helmet>
            <div className="w-full p-8 space-y-3 rounded-xl ">
                <div className="grid grid-cols-2 gap-10">
                    <div className="">
                        <img src="https://i.ibb.co/cgcXs4h/High-Rise-Buildings-1.png" alt="" className="rounded-xl h-full" />
                    </div>
                    <div className="space-y-5 p-8 border rounded-xl">
                        <h1 className="text-4xl font-bold text-left">Welcome Back</h1>
                        <LoginForm navigateToPage={navigateToPage} />
                        <div className="flex items-center pt-4 space-x-1">
                            <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                            <p className="px-3 text-sm dark:text-gray-600">Login with social accounts</p>
                            <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                        </div>
                        <button onClick={handleGoogleSignIn} type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                            <FcGoogle className="w-5 h-5" />
                            <p>Login with Google</p>
                        </button>
                        <p className="text-xs text-center sm:px-6 dark:text-gray-600">Don't have an account?
                            <Link to='/signup' className="underline dark:text-gray-800">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;