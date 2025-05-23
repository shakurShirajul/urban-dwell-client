import { Link } from "react-router-dom";
import SignupForm from "./SignupForm";
import { Helmet } from "react-helmet-async";

const Signup = () => {
  return (
    <div className="container mx-auto font-poppins py-24">
      <Helmet>
        <title>SignUp | Urban Dwell</title>
      </Helmet>
      <div className="w-full flex justify-center p-8 space-y-3 rounded-xl ">
        <div className="max-w-md">
          <div className="space-y-5 ">
            <div className="p-10 border rounded-xl">
              <h1 className="text-4xl font-bold text-left uppercase text-black dark:text-gray-400">
                Get Started with <br />{" "}
                <span className="text-[#274c07]">Urban</span>{" "}
                <span className="text-[#1a3842]">Dwell</span>
              </h1>
              <SignupForm />
              <p className="text-center sm:px-6  mt-2">
                Already Have An Account?
                <Link to="/login" className="underline ">
                  {" "}
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
