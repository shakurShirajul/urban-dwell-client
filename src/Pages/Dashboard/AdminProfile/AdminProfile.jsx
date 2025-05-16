import React, { useContext } from "react";
import useAxiosSecure from "../../../hooks/userAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Providers/AuthProviders";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useContext(AuthContext);

  const { data: adminData = [] } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/info?email=${user.email}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const { data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/stats?email=${user.email}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  console.log(adminData);

  return (
    <div className="font-mulish">
      <div className="mb-5">
        <h1 className="text-3xl font-semibold">User Profile: </h1>
      </div>
      <div className="space-y-5">
        {/* Personal Details */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Personal Details: </h1>
          <div className="rounded-xl shadow-md border border-gray-200 px-3 py-2 dark:bg-gray-50">
            <div className="flex flex-col lg:flex-row gap-6 rounded-xl ">
              {/* Profile Image */}
              <div>
                <div className="avatar w-32 h-32">
                  <img src={adminData.user_image} className="rounded-xl" />
                </div>
              </div>
              {/* Profile Description */}
              <div className="w-full">
                <h3 className="text-lg font-medium">{adminData.user_name}</h3>
                <h4 className="text-sm font-medium">{adminData.user_email}</h4>
              </div>
            </div>
          </div>
        </div>
        {/* Dashboard Details */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Details: </h1>
          {/* Dashboard Detials */}
          <div className="max-w-7xl mx-auto rounded-xl border border-gray-200 shadow-md px-3 py-2 dark:text-gray-800 bg-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="text-right border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-100">
                    <td className="px-3 py-2 text-left">
                      <span>1</span>
                    </td>
                    <td className="px-3 py-2 text-left">
                      <span>Total Apartments</span>
                    </td>
                    <td className="px-3 py-2">
                      <span> {stats.totalApartments}</span>
                    </td>
                  </tr>
                  <tr className="text-right border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-100">
                    <td className="px-3 py-2 text-left">
                      <span>2</span>
                    </td>
                    <td className="px-3 py-2 text-left">
                      <span>Total User</span>
                    </td>
                    <td className="px-3 py-2">
                      <span> {stats.totalUsers}</span>
                    </td>
                  </tr>
                  <tr className="text-right border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-100">
                    <td className="px-3 py-2 text-left">
                      <span>2</span>
                    </td>
                    <td className="px-3 py-2 text-left">
                      <span>Total Member</span>
                    </td>
                    <td className="px-3 py-2">
                      <span> {stats.totalMembers}</span>
                    </td>
                  </tr>
                  <tr className="text-right border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-100">
                    <td className="px-3 py-2 text-left">
                      <span>3</span>
                    </td>
                    <td className="px-3 py-2 text-left">
                      <span>Available Apartments</span>
                    </td>
                    <td className="px-3 py-2">
                      <span> {stats.percentageOfAvailableRoom}%</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex flex-col justify-center items-center space-y-5 mt-10">
        <div className="flex flex-col gap-5 md:flex-row">
          <div>
            <div className="stats bg-primary text-primary-content w-full">
              <div className="stat flex flex-col justify-center items-center">
                <div className="stat-title text-white text-3xl font-semibold uppercase">
                  Total Rooms
                </div>
                <div className="stat-value flex justify-center items-center gap-2 text-white">
                  <MdOutlineMeetingRoom className="text-4xl" />
                  {stats.totalApartments}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="stats bg-secondary text-primary-content w-full">
              <div className="stat flex flex-col justify-center items-center">
                <div className="stat-title text-white text-3xl font-semibold uppercase">
                  Total User
                </div>
                <div className="stat-value flex justify-center items-center gap-2 text-white">
                  <FaUser className="text-4xl" />
                  {stats.totalUsers}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="stats bg-accent text-primary-content w-full">
              <div className="stat flex flex-col justify-center items-center">
                <div className="stat-title text-white text-3xl font-semibold uppercase">
                  Total Member
                </div>
                <div className="stat-value flex justify-center items-center gap-2 text-white">
                  <FaUser className="text-4xl" />
                  {stats.totalMembers}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <div>
            <div className="stats bg-info text-primary-content w-full">
              <div className="stat flex flex-col justify-center items-center">
                <div className="stat-title text-white text-3xl font-semibold uppercase">
                  Available Rooms
                </div>
                <div className="stat-value flex justify-center items-center gap-2 text-white">
                  <MdOutlineMeetingRoom className="text-4xl" />
                  {stats.percentageOfAvailableRoom}%
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="stats bg-warning text-primary-content w-full">
              <div className="stat flex flex-col justify-center items-center">
                <div className="stat-title text-white text-3xl font-semibold uppercase">
                  Unavailable Rooms{" "}
                </div>
                <div className="stat-value flex justify-center items-center gap-2 text-white">
                  <MdOutlineMeetingRoom className="text-4xl" />
                  {stats.percentageOfUnavailableRoom}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AdminProfile;
