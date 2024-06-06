import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import useAxiosSecure from "./userAxiosSecure";


const useMember = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isMember, isPending: isMemberLoading } = useQuery({
        queryKey: [user?.email, 'iseMember'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/checking?role=member&email=${user.email}`);
            return res.data?.validation;
        }
    })
    return [isMember, isMemberLoading]
};

export default useMember;