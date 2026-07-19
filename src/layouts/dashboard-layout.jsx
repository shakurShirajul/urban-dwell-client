import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  HiOutlineArrowLeft,
  HiOutlineBars3,
  HiOutlineBell,
  HiOutlineBuildingOffice2,
  HiOutlineCreditCard,
  HiOutlineDocumentCheck,
  HiOutlineMegaphone,
  HiOutlineReceiptPercent,
  HiOutlineTag,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineXMark,
} from "react-icons/hi2";
import logo from "@/assets/images/logo/urban-dwell.png";
import useAxiosSecure from "@/shared/hooks/use-axios-secure";
import { AuthContext } from "@/shared/contexts/auth-context";
import { LoadingState } from "@/shared/components/ui/feedback";

const adminNavigation = [
  ["Overview", "/dashboard/adminprofile", HiOutlineBuildingOffice2],
  ["Members", "/dashboard/managemember", HiOutlineUserGroup],
  ["New announcement", "/dashboard/makeannouncement", HiOutlineMegaphone],
  ["Agreement requests", "/dashboard/agreementrequest", HiOutlineDocumentCheck],
  ["Coupons", "/dashboard/managecoupons", HiOutlineTag],
];

const memberNavigation = [
  ["My home", "/dashboard/myprofile", HiOutlineUserCircle],
  ["Pay rent", "/dashboard/makepayment", HiOutlineCreditCard],
  ["Payment history", "/dashboard/paymenthistory", HiOutlineReceiptPercent],
  ["Announcements", "/dashboard/announcement", HiOutlineBell],
];

const userNavigation = [
  ["My profile", "/dashboard/myprofile", HiOutlineUserCircle],
  ["Announcements", "/dashboard/announcement", HiOutlineBell],
];

const DashboardLayout = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => setSidebarOpen(false), [location]);

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/role?email=${user.email}`);
      return response.data;
    },
  });

  if (isLoading) return <LoadingState label="Preparing your dashboard…" />;

  const currentRole = role?.user_role || "user";
  const navigation = currentRole === "admin" ? adminNavigation : currentRole === "member" ? memberNavigation : userNavigation;

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
        <Link to="/" className="flex items-center gap-3" aria-label="Return to Urban Dwell home">
          <img src={logo} alt="" width="42" height="42" className="size-10 object-contain" />
          <span className="font-display text-xl font-semibold">Urban Dwell</span>
        </Link>
        <button type="button" onClick={() => setSidebarOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-white/10 lg:hidden" aria-label="Close dashboard navigation">
          <HiOutlineXMark className="text-2xl" aria-hidden="true" />
        </button>
      </div>

      <div className="px-5 pt-7">
        <p className="eyebrow text-white/45">{currentRole} workspace</p>
      </div>
      <nav className="mt-4 flex-1 px-3" aria-label="Dashboard navigation">
        <ul className="space-y-1">
          {navigation.map(([label, path, Icon]) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors duration-200 ${isActive ? "bg-white text-steel" : "text-white/65 hover:bg-white/10 hover:text-white"}`}
              >
                <Icon className="text-xl" aria-hidden="true" /> {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link to="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-white/65 hover:bg-white/10 hover:text-white">
          <HiOutlineArrowLeft className="text-xl" aria-hidden="true" /> Public site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 lg:grid lg:grid-cols-[17rem_1fr]">
      <Helmet><title>Dashboard | Urban Dwell</title></Helmet>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-68 bg-secondary text-secondary-content lg:block">{sidebar}</aside>

      {sidebarOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-ink/60" onClick={() => setSidebarOpen(false)} aria-label="Close dashboard navigation overlay" />
          <aside className="relative h-full w-[min(19rem,88vw)] bg-secondary text-secondary-content shadow-2xl">{sidebar}</aside>
        </div>
      ) : null}

      <div className="min-w-0 lg:col-start-2">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-base-content/10 bg-base-100/90 px-4 backdrop-blur-xl sm:px-7 lg:px-10">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setSidebarOpen(true)} className="grid size-11 place-items-center rounded-full border border-base-content/10 text-2xl lg:hidden" aria-label="Open dashboard navigation">
              <HiOutlineBars3 aria-hidden="true" />
            </button>
            <div>
              <p className="eyebrow hidden text-primary sm:block">Resident operations</p>
              <p className="font-display text-lg font-semibold sm:hidden">Dashboard</p>
            </div>
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden min-w-0 text-right sm:block">
              <p className="truncate text-sm font-bold">{user?.displayName || "Urban Dwell resident"}</p>
              <p className="truncate text-xs text-base-content/50">{user?.email}</p>
            </div>
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" width="42" height="42" className="size-11 rounded-full object-cover ring-2 ring-primary/20" />
            ) : (
              <span className="grid size-11 place-items-center rounded-full bg-primary font-bold text-primary-content">{user?.displayName?.charAt(0) || "U"}</span>
            )}
          </div>
        </header>

        <main className="p-4 sm:p-7 lg:p-10 xl:p-12"><Outlet /></main>
      </div>
    </div>
  );
};

export default DashboardLayout;
