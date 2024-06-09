import React, { useContext } from 'react';
import useAxiosSecure from '../../../hooks/userAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Providers/AuthProviders';
import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaUser } from 'react-icons/fa';

const AdminProfile = () => {

    const axiosSecure = useAxiosSecure();

    const { user } = useContext(AuthContext);

    const { data: adminData = [] } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/info?email=${user.email}`, { withCredentials: true })
            return res.data;
        }
    })

    const { data: stats = [] } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/stats?email=${user.email}`, { withCredentials: true })
            return res.data;
        }
    })

    console.log(adminData);

    return (
        <div className='font-roboto'>
            <div className='border rounded-xl shadow-sm p-6 dark:bg-gray-50 space-y-2'>
                <div className='space-y-2'>
                    <div>
                        <h1 className='text-3xl font-semibold'>User Profile: </h1>
                    </div>
                    <div className="">
                        <div className="flex flex-col lg:flex-row gap-6  rounded-xl ">
                            <div>
                                <div className="avatar">
                                    <div className="w-32 rounded">
                                        <img src={adminData.user_image} />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row justify-between w-full'>
                                <div>
                                    <div className='w-full'>
                                        <h1 className='text-xl font-bold'>Personal Details: </h1>
                                        <div>
                                            <div>
                                                <p className='text-lg font-normal'> <span className='font-medium'>Name: </span>{adminData.user_name}</p>
                                            </div>
                                            <div>
                                                <p className='text-lg font-normal'><span className='font-medium'>Email: </span>{adminData.user_email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5 flex flex-wrap justify-center gap-5'>
                <div>
                    <div className="stats bg-primary text-primary-content" >
                        <div className="stat flex flex-col justify-center items-center">
                            <div className="stat-title text-white text-3xl font-semibold uppercase">Total Rooms</div>
                            <div className="stat-value flex justify-center items-center gap-2 text-white"><MdOutlineMeetingRoom  className='text-4xl'/>{stats.totalApartments}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="stats bg-secondary text-primary-content" >
                        <div className="stat flex flex-col justify-center items-center">
                            <div className="stat-title text-white text-3xl font-semibold uppercase">Total User</div>
                            <div className="stat-value flex justify-center items-center gap-2 text-white"><FaUser  className='text-4xl'/>{stats.totalUsers}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="stats bg-accent text-primary-content" >
                        <div className="stat flex flex-col justify-center items-center">
                            <div className="stat-title text-white text-3xl font-semibold uppercase">Total Member</div>
                            <div className="stat-value flex justify-center items-center gap-2 text-white"><FaUser  className='text-4xl'/>{stats.totalMembers}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="stats bg-info text-primary-content" >
                        <div className="stat flex flex-col justify-center items-center">
                            <div className="stat-title text-white text-3xl font-semibold uppercase">Percentage Of Available Rooms</div>
                            <div className="stat-value flex justify-center items-center gap-2 text-white"><MdOutlineMeetingRoom  className='text-4xl'/>{stats.percentageOfAvailableRoom}%</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="stats bg-warning text-primary-content" >
                        <div className="stat flex flex-col justify-center items-center">
                            <div className="stat-title text-white text-3xl font-semibold uppercase">Percentage Of Unavailable Rooms </div>
                            <div className="stat-value flex justify-center items-center gap-2 text-white"><MdOutlineMeetingRoom  className='text-4xl'/>{stats.percentageOfUnavailableRoom}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;