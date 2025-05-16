import MemeberTableRow from "./MemeberTableRow";

import { ToastContainer } from "react-toastify";
import useAxiosSecure from "../../../hooks/userAxiosSecure";

const ManageMembersTable = ({ members, handleRemoveButton }) => {
  return (
    <div className="font-mulish rounded-md border-gray-200 shadow-md bg-gray-100 text-gray-800">
      <div className="overflow-x-auto">
        <table className="table ">
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
            {members.map((member, index) => (
              <MemeberTableRow
                member={member}
                handleRemoveButton={handleRemoveButton}
              />
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageMembersTable;
