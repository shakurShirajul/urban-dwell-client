import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";

const useAnnouncements = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["announcements", email],
    enabled: Boolean(email),
    queryFn: async () => (await axiosSecure.get(`/announcements?email=${email}`)).data,
  });
};

export default useAnnouncements;
