"use client";


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import type { Agreement } from "@/types/domain";

const useAgreementRequests = (email?: string | null) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["agreement-requests", email],
    enabled: Boolean(email),
    queryFn: async () => (await axiosSecure.get<Agreement[]>(`/agreements/requests?email=${email}`)).data,
  });
};

export default useAgreementRequests;
