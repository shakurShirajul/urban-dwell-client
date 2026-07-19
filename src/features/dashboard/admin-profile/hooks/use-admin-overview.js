import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";

export const useAdminProfile = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["admin-profile", email],
    enabled: Boolean(email),
    queryFn: async () => (await axiosSecure.get(`/admin/info?email=${email}`)).data,
  });
};

export const useAdminStats = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["admin-stats", email],
    enabled: Boolean(email),
    queryFn: async () => (await axiosSecure.get(`/admin/stats?email=${email}`)).data,
  });
};
