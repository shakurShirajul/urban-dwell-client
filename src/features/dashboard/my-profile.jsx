import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { HiOutlineBuildingOffice2, HiOutlineCalendarDays, HiOutlineHomeModern, HiOutlineSquares2X2 } from "react-icons/hi2";
import { AuthContext } from "@/shared/contexts/auth-context";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import { LoadingState, PageHeading } from "@/shared/components/ui/feedback";
import { formatDate } from "@/shared/lib/formatters";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: roleLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => (await axiosSecure.get(`/users/role?email=${user.email}`)).data,
  });
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => (await axiosSecure.get(`/users/specific/${user.email}`)).data,
  });

  if (roleLoading || userLoading) return <LoadingState label="Loading your home…" />;
  if (role?.user_role === "admin") return <Navigate to="/dashboard/adminprofile" replace />;

  const isMember = role?.user_role === "member";
  const apartmentDetails = [
    ["Block", isMember ? userData?.block_name : "Not assigned", HiOutlineSquares2X2],
    ["Floor", isMember ? userData?.floor_no : "Not assigned", HiOutlineBuildingOffice2],
    ["Apartment", isMember ? userData?.apartment_no : "Not assigned", HiOutlineHomeModern],
    ["Agreement date", isMember ? formatDate(userData?.agreement_accept_date) : "Pending approval", HiOutlineCalendarDays],
  ];

  return (
    <div>
      <PageHeading eyebrow="Resident record" title="My home" description="Your profile and current apartment information." />
      <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]">
        <section className="surface-card p-7">
          {userData?.user_image ? <img src={userData.user_image} alt="" width="160" height="160" className="size-40 rounded-[2rem] object-cover" /> : null}
          <p className="eyebrow mt-8 text-primary">{isMember ? "Resident" : "Applicant"}</p>
          <h2 className="mt-3 break-words font-display text-3xl font-semibold">{userData?.user_name || user?.displayName}</h2>
          <p className="mt-2 break-words text-sm text-base-content/55">{userData?.user_email || user?.email}</p>
        </section>
        <section className="grid gap-4 sm:grid-cols-2" aria-label="Apartment details">
          {apartmentDetails.map(([label, value, Icon]) => (
            <article key={label} className="surface-card p-6">
              <Icon className="text-2xl text-primary" aria-hidden="true" />
              <p className="eyebrow mt-8 text-base-content/45">{label}</p>
              <p className="mt-2 break-words text-lg font-bold">{value}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default MyProfile;
