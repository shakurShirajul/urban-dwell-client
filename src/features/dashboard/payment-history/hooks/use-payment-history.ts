"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import type { Payment } from "@/types/domain";

const usePaymentHistory = (email?: string | null, month = "") => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["payment-history", email, month],
    enabled: Boolean(email),
    queryFn: async () => {
      const endpoint = month ? "/apartment-rent-info/search" : "/apartment-rent-info";
      const params = month ? { email, month } : { email };
      return (await axiosSecure.get<Payment[]>(endpoint, { params })).data;
    },
  });
};

export default usePaymentHistory;
