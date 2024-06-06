import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MemeberTableRow from "./MemeberTableRow";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { ToastContainer } from "react-toastify";
import useAxiosSecure from "../../../hooks/userAxiosSecure";

const ManageMembersTable = () => {

    const { successToast } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: members = [], isPending, isLoading, refetch } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/members?email=${user.email}`, { withCredentials: true })
            return res.data;
        }
    })

    const handleRemoveButton = async (id) => {
        const res = await axiosSecure.patch(`/users/role?email=${user.email}`, { id }, { withCredentials: true });
        if (res.data.modifiedCount > 0) {
            successToast("Member removed successfully");
        }
        refetch();
    }

    return (
        <div className="font-mulish">
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="text-base">
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            members.map((member, index) =>
                                <MemeberTableRow member={member} handleRemoveButton={handleRemoveButton} />
                            )
                        }
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ManageMembersTable;