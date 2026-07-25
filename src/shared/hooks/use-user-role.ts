"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import type { UserRole } from "@/types/domain";

export const userRoleQueryKey = (email?: string | null) => ["role", email];

const useUserRole = (email?: string | null) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: userRoleQueryKey(email),
    enabled: Boolean(email),
    queryFn: async () => {
      const response = await axiosSecure.get("/users/role", { params: { email } });
      return response.data as { user_role: UserRole };
    },
  });
};

export default useUserRole;
