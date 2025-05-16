import React, { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/userAxiosSecure";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: roleMyProfile = [],
    isPending,
    isLoading: isRoleMyProfileLoading,
  } = useQuery({
    queryKey: ["roleMyProfile"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${user.email}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const isRole = roleMyProfile.user_role;

  if (isRole === "admin") {
    navigate("/dashboard/adminprofile");
  }

  const {
    data: userData = [],
    refetch,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/specific/${user.email}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const {
    user_name,
    user_email,
    user_image,
    block_name,
    floor_no,
    apartment_no,
    agreement_accept_date,
  } = userData;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let agreementAcceptDate = "None";

  if (agreement_accept_date !== "None") {
    const currentDate = new Date(agreement_accept_date);
    const date = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    let datePostfix = "th";
    if (date === 1) {
      datePostfix = "st";
    } else if (date === 2) {
      datePostfix = "nd";
    } else if (date === 3) {
      datePostfix = "rd";
    }
    agreementAcceptDate = `${date}${datePostfix} ${monthNames[month]} ${year}`;
  }

  console.log(
    user_name,
    user_email,
    user_image,
    block_name,
    floor_no,
    apartment_no
  );

  return (
    <div>
      {isRoleMyProfileLoading && isUserLoading ? (
        <div className="flex h-screen items-center justify-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        </div>
      ) : (
        <div className="font-mulish">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-5">
            My Profile
          </h1>
          <div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Personal Details: </h1>
              <div className="rounded-xl shadow-md border border-gray-200 px-3 py-2 dark:bg-gray-100">
                <div className="flex flex-col lg:flex-row gap-6 rounded-xl ">
                  {/* Profile Image */}
                  <div>
                    <div className="avatar w-40 h-50">
                      <img src={user_image} className="rounded-xl" />
                    </div>
                  </div>
                  {/* Profile Description */}
                  <div className="w-full space-y-0">
                    <h1 className="text-xl font-bold">User Info: </h1>
                    <h3 className="text-lg font-medium">{user_name}</h3>
                    <h4 className="text-sm font-medium">{user_email}</h4>
                    {/* User Apartments Details */}
                    <h1 className="text-xl font-bold">Apartment Info: </h1>
                    <h3 className="text-md font-medium">
                      <span className="font-semibold">Block Name: </span>
                      {isRole == "member" ? block_name : "None"}
                    </h3>
                    <h3 className="text-md font-medium">
                      <span className="font-semibold">Floor No: </span>
                      {isRole == "member" ? floor_no : "None"}
                    </h3>
                    <h3 className="text-md font-medium">
                      <span className="font-semibold">Apartment No: </span>
                      {isRole == "member" ? apartment_no : "None"}
                    </h3>
                    <h3 className="text-md font-medium">
                      <span className="font-medium">
                        Agreement Accept Date:
                      </span>
                      {isRole == "member" ? agreementAcceptDate : "None"}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
