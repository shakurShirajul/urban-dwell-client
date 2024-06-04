import React from 'react';
import { useForm } from 'react-hook-form';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignupForm = () => {
    const { register, handleSubmit, errors, reset } = useForm();

    const onSubmit = async (data) => {

        const imageFile = { image: data.image[0] };
        const res = await
            console.log(data);
    }

    return (
        <div className='font-poppins'>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <div className="space-y-1 text-base mt-5">
                        <label className="block text-lg text-black">Name:</label>
                        <input
                            type="text"
                            placeholder="Shirajul Islam"
                            required
                            {...register('name', { required: true })}
                            className="w-full px-4 py-3 rounded-md border dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    <div className="space-y-1 text-base">
                        <label className="block text-lg text-black">Email:</label>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            required
                            {...register('email', { required: true })}
                            className="w-full px-4 py-3 rounded-md border dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="block text-lg text-black">Profile Photo:</label>
                        <input
                            {...register('image', { required: true })} type="file"
                            required
                            className="file-input file-input-bordered w-full" />
                    </div>
                    <div className="space-y-1 text-base mb-5">
                        <label className="block text-lg text-black">Password:</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-md border dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    <button className="block w-full p-3 text-center rounded-md dark:text-gray-50 dark:bg-violet-600">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;