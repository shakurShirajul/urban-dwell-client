"use client";


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import type { UrbanUser } from "@/types/domain";

const useMembers = (email?: string | null) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["members", email],
    enabled: Boolean(email),
    queryFn: async () => (await axiosSecure.get<UrbanUser[]>("/users/members", { params: { email } })).data,
  });
};

export default useMembers;
