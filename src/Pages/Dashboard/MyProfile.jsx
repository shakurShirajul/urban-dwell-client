import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/userAxiosSecure';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: roleMyProfile = [], isPending, isLoading } = useQuery({
        queryKey: ['roleMyProfile'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role?email=${user.email}`, { withCredentials: true })
            return res.data;
        }
    })

    const isRole = roleMyProfile.user_role;

    if(isRole === 'admin'){
        navigate('/dashboard/adminprofile');
    }


    const { data: userData = [], refetch } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/specific/${user.email}`, { withCredentials: true })
            return res.data;
        }
    })

    const { user_name, user_email, user_image, block_name, floor_no, apartment_no, agreement_accept_date } = userData;

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let agreementAcceptDate = "None";

    if (agreement_accept_date !== 'None') {
        const currentDate = new Date(agreement_accept_date);
        const date = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        let datePostfix = 'th';
        if (date === 1) {
            datePostfix = 'st';
        } else if (date === 2) {
            datePostfix = 'nd';
        } else if (date === 3) {
            datePostfix = 'rd';
        }
        agreementAcceptDate = `${date}${datePostfix} ${monthNames[month]} ${year}`;
    }


    console.log(user_name, user_email, user_image, block_name, floor_no, apartment_no);

    return (
        <div>
            <div className='border rounded-xl shadow-sm p-6 dark:bg-gray-50 space-y-5'>
                <div>
                    <h1 className='text-4xl font-extrabold text-gray-800'>Profile: </h1>
                </div>
                <div className="max-w-4xl mx-auto font-roboto">
                    <div className="flex flex-col lg:flex-row gap-6  rounded-xl ">
                        <div>
                            <div className="avatar">
                                <div className="w-32 rounded">
                                    <img src={user_image} />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row justify-between w-full'>
                            <div>
                                <div className='w-full'>
                                    <h1 className='text-xl font-bold'>Personal Details: </h1>
                                    <div>
                                        <div>
                                            <p className='text-lg font-normal'> <span className='font-medium'>Name: </span>{user_name}</p>
                                        </div>
                                        <div>
                                            <p className='text-lg font-normal'><span className='font-medium'>Email: </span>{user_email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className='text-xl font-bold'>Apartment Details:</h1>
                                <div className=''>
                                    <div>
                                        <div>
                                            <p className='text-lg font-normal'><span className='font-medium'>Block Name: </span>{isRole == "member" ? block_name: "None"}</p>
                                        </div>
                                        <div>
                                            <p className='text-lg font-normal'><span className='font-medium'>Floor No: </span>{isRole == "member" ? floor_no: "None"}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <p className='text-lg font-normal'><span className='font-medium'>Room No: </span>{isRole == "member" ? apartment_no : "None"}</p>
                                        </div>
                                        <div>
                                            <p className='text-lg font-normal'><span className='font-medium'>Agreement Accept Date: </span>{isRole == "member" ? agreementAcceptDate : "None"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;