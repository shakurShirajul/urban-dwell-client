"use client";


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import type { Announcement } from "@/types/domain";

const useAnnouncements = (email?: string | null) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["announcements", email],
    enabled: Boolean(email),
    queryFn: async () => (await axiosSecure.get<Announcement[]>("/announcements", { params: { email } })).data,
  });
};

export default useAnnouncements;
