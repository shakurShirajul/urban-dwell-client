"use client";


import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "@/shared/contexts/auth-context";
import useAxiosSecure from "./use-axios-secure";


const useMember = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isMember, isPending: isMemberLoading } = useQuery({
    queryKey: ["role", "member", user?.email],
    enabled: !loading && Boolean(user?.email),
    queryFn: async () => {
      const response = await axiosSecure.get("/users/checking", { params: { role: "member", email: user?.email } });
      return response.data?.validation;
    },
  });
  return [isMember, isMemberLoading];
};

export default useMember;
