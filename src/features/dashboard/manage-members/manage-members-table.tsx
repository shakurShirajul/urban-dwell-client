import MemberTableRow from "./member-table-row";
import type { UrbanUser } from "@/types/domain";

const ManageMembersTable = ({ members, onRemove }: { members: UrbanUser[]; onRemove: (member: UrbanUser) => void }) => (
  <div className="surface-card overflow-x-auto">
    <table className="w-full min-w-[40rem] text-left">
      <caption className="sr-only">Current Urban Dwell members</caption>
      <thead className="border-b border-base-content/10 bg-base-200/70">
        <tr className="eyebrow text-base-content/45"><th className="px-4 py-4">Member</th><th className="px-4 py-4">Email</th><th className="px-4 py-4 text-right">Action</th></tr>
      </thead>
      <tbody>{members.map((member) => <MemberTableRow key={member._id} member={member} onRemove={onRemove} />)}</tbody>
    </table>
  </div>
);


export default ManageMembersTable;
