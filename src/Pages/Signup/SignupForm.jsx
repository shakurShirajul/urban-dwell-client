import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProviders";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignupForm = () => {
  const { user, signUp, successToast, updateUser, errorToast } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();

  const navigateToHomePage = () => {
    setTimeout(() => {
      navigate("/");
      location.reload();
    }, 2000);
  };

  const { register, handleSubmit, errors, reset } = useForm();

  const passwordValidation = (password) => {
    const checkCapital = /[A-z]/;
    const checkSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const checkNumeric = /\d/;

    const hasCapital = checkCapital.test(password);
    const hasSpecialChar = checkSpecialChar.test(password);
    const hasNumeric = checkNumeric.test(password);
    const isLengthValid = password.length >= 6;

    if (!hasCapital) {
      errorToast("Password must contain at least one uppercase letter.");
    }
    if (!hasSpecialChar) {
      errorToast("Password must contain at least one Special character.");
    }
    if (!hasNumeric) {
      errorToast("Password must be at least one Numeric character.");
    }
    if (!isLengthValid) {
      errorToast("Password must be at least 6 characters long.");
    }
    if (hasCapital && hasSpecialChar && hasNumeric && isLengthValid) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const imageFile = { image: data.image[0] };

    console.log(data);

    const checkPassword = passwordValidation(password);

    if (checkPassword) {
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const image_url = res.data.data.display_url;
        const newUserData = { email, name, image: image_url };
        console.log(image_url);
        signUp(email, password)
          .then((userCredential) => {
            updateUser(name, image_url)
              .then(() => {
                axiosPublic.post("/users", newUserData);
                successToast("Registration Successful");
                navigateToHomePage();
                reset();
              })
              .catch((error) => {
                errorToast(error.message);
              });
          })
          .catch((error) => {
            const errorMessage = error.message;
            errorToast(error.message);
          });
      }
    }
  };
  return (
    <div className="font-mulish">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="space-y-1 text-base mt-5">
            <label className="block text-lg text-black">Name:</label>
            <input
              type="text"
              placeholder="Shirajul Islam"
              required
              {...register("name", { required: true })}
              className="w-full px-4 py-3 rounded-md border dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
          </div>
          <div className="space-y-1 text-base">
            <label className="block text-lg text-black">Email:</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              required
              {...register("email", { required: true })}
              className="w-full px-4 py-3 rounded-md border dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
          </div>
          <div className="form-control w-full my-6">
            <label className="block text-lg text-black">Profile Photo:</label>
            <input
              {...register("image", { required: true })}
              type="file"
              required
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div className="space-y-1 text-base mb-5">
            <label className="block text-lg text-black">Password:</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              required
              className="w-full px-4 py-3 rounded-md border dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
          </div>
          <button className="block w-full p-3 text-center rounded-md font-semibold text-lg dark:text-gray-50 bg-primary">
            Sign Up
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
