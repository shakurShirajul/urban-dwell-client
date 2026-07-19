import { useContext } from "react";
import { HiOutlineBuildingOffice2, HiOutlineHomeModern, HiOutlineUserGroup, HiOutlineUsers } from "react-icons/hi2";
import { AuthContext } from "@/shared/contexts/auth-context";
import { LoadingState, PageHeading } from "@/shared/components/ui/feedback";
import { useAdminProfile, useAdminStats } from "./hooks/use-admin-overview";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const { data: adminData, isLoading: profileLoading } = useAdminProfile(user?.email);
  const { data: stats, isLoading: statsLoading } = useAdminStats(user?.email);

  if (profileLoading || statsLoading) return <LoadingState label="Loading building overview…" />;

  const statCards = [
    ["Total apartments", stats?.totalApartments || 0, HiOutlineBuildingOffice2],
    ["Registered users", stats?.totalUsers || 0, HiOutlineUsers],
    ["Active members", stats?.totalMembers || 0, HiOutlineUserGroup],
    ["Available homes", `${stats?.percentageOfAvailableRoom || 0}%`, HiOutlineHomeModern],
  ];

  return (
    <div>
      <PageHeading eyebrow="Admin overview" title="Building at a glance" description="Monitor residents and apartment availability from one place." />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Building statistics">
        {statCards.map(([label, value, Icon]) => (
          <article key={label} className="surface-card p-6">
            <Icon className="text-2xl text-primary" aria-hidden="true" />
            <p className="tabular mt-8 font-mono text-3xl font-semibold">{value}</p>
            <p className="mt-2 text-sm font-semibold text-base-content/55">{label}</p>
          </article>
        ))}
      </section>
      <section className="surface-card mt-6 grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
        {adminData?.user_image ? <img src={adminData.user_image} alt="" width="112" height="112" className="size-28 rounded-3xl object-cover" /> : null}
        <div className="min-w-0">
          <p className="eyebrow text-primary">Building administrator</p>
          <h2 className="mt-3 truncate font-display text-3xl font-semibold">{adminData?.user_name || user?.displayName}</h2>
          <p className="mt-2 break-words text-base-content/55">{adminData?.user_email || user?.email}</p>
        </div>
      </section>
    </div>
  );
};

export default AdminProfile;
