import { useContext } from "react";
import AgreementRequestsTable from "./agreement-requests-table";
import { AuthContext } from "@/shared/contexts/auth-context";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import { EmptyState, LoadingState, PageHeading } from "@/shared/components/ui/feedback";
import useAgreementRequests from "./hooks/use-agreement-requests";

const AgreementRequests = () => {
  const { user, successToast, updateToast, errorToast } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: requests = [], refetch, isLoading } = useAgreementRequests(user?.email);

  const updateRequest = async (id, status) => {
    if (status === "rejected" && !window.confirm("Reject this agreement request? The applicant will lose this request.")) return;
    try {
      await axiosSecure.patch(`/agreements/requests/updates?status=${status}&id=${id}&email=${user.email}`);
      await refetch();
      status === "accepted" ? successToast("Agreement accepted") : updateToast("Agreement rejected");
    } catch {
      errorToast("The agreement could not be updated. Try again.");
    }
  };

  if (isLoading) return <LoadingState label="Loading agreement requests…" />;

  return (
    <div>
      <PageHeading eyebrow="Leasing queue" title="Agreement requests" description="Review each applicant and residence before making a decision." />
      {requests.length ? (
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[52rem] text-left">
            <caption className="sr-only">Pending apartment agreement requests</caption>
            <thead className="border-b border-base-content/10 bg-base-200/70">
              <tr className="eyebrow text-base-content/45"><th className="px-4 py-4">Applicant</th><th className="px-4 py-4">Residence</th><th className="px-4 py-4">Rent</th><th className="px-4 py-4">Requested</th><th className="px-4 py-4 text-right">Decision</th></tr>
            </thead>
            <tbody>{requests.map((request) => <AgreementRequestsTable key={request._id} request={request} onAccept={(id) => updateRequest(id, "accepted")} onReject={(id) => updateRequest(id, "rejected")} />)}</tbody>
          </table>
        </div>
      ) : <EmptyState title="No agreement requests" description="New apartment requests will appear here for review." />}
    </div>
  );
};

export default AgreementRequests;
