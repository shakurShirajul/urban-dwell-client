import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MemeberTableRow from "./MemeberTableRow";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { ToastContainer } from "react-toastify";

const ManageMembersTable = () => {

    const { successToast } = useContext(AuthContext);

    const { data: members = [], isPending, isLoading, refetch } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/users?user_role=member`, { withCredentials: true })
            return res.data;

        }
    })

    const handleRemoveButton = async (id) => {
        const res = await axios.patch(`http://localhost:5000/users/role?id=${id}`, { withCredentials: true});
        // console.log(res);
        console.log(res.data);
        if(res.data.modifiedCount>0){
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
            <ToastContainer/>
        </div>
    );
};

export default ManageMembersTable;