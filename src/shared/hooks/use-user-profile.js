import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";

export const userProfileQueryKey = (email) => ["user-profile", email];

const useUserProfile = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: userProfileQueryKey(email),
    enabled: Boolean(email),
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/specific/${email}`);
      return response.data;
    },
  });
};

export default useUserProfile;
