import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import axios from "axios";


const useRole = () => {
    const { user } = useContext(AuthContext);

    const { data: role, isPending: isRolePending} = useQuery({
        queryKey: [user?.email, 'isRole'],
        queryFn: async () => {
            const res = await axios.get(`http:localhost:5000/users/role?email=${user.email}`);
            return res.data?.admin;
        }
    })
    return [role, isRolePending]
};

export default useRole;