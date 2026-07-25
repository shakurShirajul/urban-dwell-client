"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import type { UserProfile } from "@/types/domain";

export const userProfileQueryKey = (email?: string | null) => ["user-profile", email];

const useUserProfile = (email?: string | null) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: userProfileQueryKey(email),
    enabled: Boolean(email),
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/specific/${encodeURIComponent(email!)}`);
      return response.data as UserProfile;
    },
  });
};

export default useUserProfile;
