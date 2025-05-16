import { useQuery } from "@tanstack/react-query";
import AnnouncementsCard from "./AnnouncementsCard";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import useAxiosSecure from "../../../hooks/userAxiosSecure";

const Announcements = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: announcements = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/announcements?email=${user.email}`,
        { withCredentials: true }
      );
      return response.data;
    },
  });

  console.log("Announcements ", announcements);

  return (
    <div>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        </div>
      ) : (
        <div className="font-mulish">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-5">
            Announcements
          </h1>
          <div className="space-y-2">
            {announcements.map((announcement) => (
              <AnnouncementsCard announcement={announcement} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
