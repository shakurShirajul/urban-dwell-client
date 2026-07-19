import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";

const useAgreementRequests = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["agreement-requests", email],
    enabled: Boolean(email),
    queryFn: async () => (await axiosSecure.get(`/agreements/requests?email=${email}`)).data,
  });
};

export default useAgreementRequests;
