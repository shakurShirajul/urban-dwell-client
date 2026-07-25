"use client";


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";

export const useAdminProfile = (email?: string | null) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["admin-profile", email],
    enabled: Boolean(email),
    queryFn: async () => (await axiosSecure.get("/admin/info", { params: { email } })).data,
  });
};

export const useAdminStats = (email?: string | null) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["admin-stats", email],
    enabled: Boolean(email),
    queryFn: async () => (await axiosSecure.get("/admin/stats")).data,
  });
};
