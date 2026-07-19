import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";

const useMembers = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["members", email],
    enabled: Boolean(email),
    queryFn: async () => (await axiosSecure.get(`/users/members?email=${email}`)).data,
  });
};

export default useMembers;
