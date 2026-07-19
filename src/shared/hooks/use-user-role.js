import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";

export const userRoleQueryKey = (email) => ["role", email];

const useUserRole = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: userRoleQueryKey(email),
    enabled: Boolean(email),
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/role?email=${email}`);
      return response.data;
    },
  });
};

export default useUserRole;
