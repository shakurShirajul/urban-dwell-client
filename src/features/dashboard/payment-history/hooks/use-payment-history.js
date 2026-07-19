import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";

const usePaymentHistory = (email, month) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["payment-history", email, month],
    enabled: Boolean(email),
    queryFn: async () => {
      const endpoint = month
        ? `/apartment-rent-info/search?email=${email}&month=${month}`
        : `/apartment-rent-info?email=${email}`;
      return (await axiosSecure.get(endpoint)).data;
    },
  });
};

export default usePaymentHistory;
