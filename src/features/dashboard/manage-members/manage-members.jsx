import { useContext } from "react";
import ManageMembersTable from "./manage-members-table";
import { AuthContext } from "@/shared/contexts/auth-context";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import { EmptyState, LoadingState, PageHeading } from "@/shared/components/ui/feedback";
import useMembers from "./hooks/use-members";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const { user, successToast, errorToast } = useContext(AuthContext);
  const { data: members = [], isLoading, refetch } = useMembers(user?.email);

  const removeMember = async (member) => {
    if (!window.confirm(`Remove ${member.user_name} as a member? Their resident access will change immediately.`)) return;
    try {
      await axiosSecure.patch(`/users/role?email=${user.email}`, { id: member._id });
      await refetch();
      successToast("Member removed");
    } catch {
      errorToast("The member could not be removed. Try again.");
    }
  };

  if (isLoading) return <LoadingState label="Loading members…" />;

  return (
    <div>
      <PageHeading eyebrow="Resident directory" title="Members" description={`${members.length} active ${members.length === 1 ? "member" : "members"} currently have resident access.`} />
      {members.length ? <ManageMembersTable members={members} onRemove={removeMember} /> : <EmptyState title="No active members" description="Accepted apartment agreements will add residents here." />}
    </div>
  );
};

export default ManageMembers;
