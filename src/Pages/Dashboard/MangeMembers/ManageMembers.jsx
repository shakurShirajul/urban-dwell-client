import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import ManageMembersTable from "./ManageMembersTable";
import useAxiosSecure from "../../../hooks/userAxiosSecure";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    data: members = [],
    isPending,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/members?email=${user.email}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const handleRemoveButton = async (id) => {
    const res = await axiosSecure.patch(
      `/users/role?email=${user.email}`,
      { id },
      { withCredentials: true }
    );
    if (res.data.modifiedCount > 0) {
      successToast("Member removed successfully");
    }
    refetch();
  };
  return (
    <div>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        </div>
      ) : (
        <div className="space-y-5">
          <p className="text-4xl font-extrabold text-gray-800">
            Members Of Urban Dwell
          </p>
          <ManageMembersTable
            members={members}
            handleRemoveButton={handleRemoveButton}
          />
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
