"use client";


import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/shared/contexts/auth-context";
import useAxiosSecure from "./use-axios-secure";


const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: ["role", "admin", user?.email],
    enabled: !loading && Boolean(user?.email),
    queryFn: async () => {
      const response = await axiosSecure.get("/users/checking", { params: { role: "admin", email: user?.email } });
      return response.data?.validation;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
