import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CampaignIcon from "@mui/icons-material/Campaign";
import HandshakeIcon from "@mui/icons-material/Handshake";
import PersonIcon from "@mui/icons-material/Person";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HomeIcon from "@mui/icons-material/Home";
import useAxiosSecure from "../hooks/userAxiosSecure";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const activeButton =
    "text-white bg-primary border-none rounded-lg font-semibold duration-300";
  const baseButton = "text-gray-600";
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    data: role = [],
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${user.email}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  console.log(role);

  const isRole = role.user_role;

  let sideBarNavigation;

  const adminSide = (
    <>
      <NavLink
        to="/dashboard/adminprofile"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg ${isActive && activeButton}`
        }
      >
        <AdminPanelSettingsIcon />
        Admin Profile
      </NavLink>
      <NavLink
        to="/dashboard/managemember"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg ${isActive && activeButton}`
        }
      >
        <PersonIcon />
        Manage Member
      </NavLink>
      <NavLink
        to="/dashboard/makeannouncement"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg ${isActive && activeButton}`
        }
      >
        <CampaignIcon />
        Make Announnement
      </NavLink>
      <NavLink
        to="/dashboard/agreementrequest"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg ${isActive && activeButton}`
        }
      >
        <HandshakeIcon />
        Agrement Request
      </NavLink>
      <NavLink
        to="/dashboard/managecoupons"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg ${isActive && activeButton}`
        }
      >
        <ConfirmationNumberIcon />
        Manage Coupons
      </NavLink>
    </>
  );

  const memberSide = (
    <>
      <NavLink
        to="/dashboard/myprofile"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg ${isActive && activeButton}`
        }
      >
        <AccountBoxIcon />
        My Profile
      </NavLink>
      <NavLink
        to="/dashboard/makepayment"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg ${isActive && activeButton}`
        }
      >
        <PaidIcon />
        Make Payment
      </NavLink>
      <NavLink
        to="/dashboard/paymenthistory"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg ${isActive && activeButton}`
        }
      >
        <ReceiptIcon />
        Payment History
      </NavLink>
      <NavLink
        to="/dashboard/announcement"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg ${isActive && activeButton}`
        }
      >
        <CampaignIcon />
        Announcements
      </NavLink>
    </>
  );

  const userSide = (
    <>
      <NavLink
        to="/dashboard/myprofile"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg ${isActive && activeButton}`
        }
      >
        <AccountBoxIcon />
        My Profile
      </NavLink>
      <NavLink
        to="/dashboard/announcement"
        className={({ isActive }) =>
          `flex items-center gap-2 p-2 rounded-lg ${isActive && activeButton}`
        }
      >
        <CampaignIcon />
        Announcements
      </NavLink>
    </>
  );

  if (!isLoading) {
    if (isRole === "admin") {
      sideBarNavigation = adminSide;
    } else if (isRole === "user") {
      sideBarNavigation = userSide;
    } else if (isRole === "member") {
      sideBarNavigation = memberSide;
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex h-screen items-centerstify-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        </div>
      ) : (
        <div className="p-5 lg:p-0">
          <Helmet>
            <title>Dashboard | Urban Dwell</title>
          </Helmet>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-80">
              <div className="drawer lg:drawer-open">
                <input
                  id="my-drawer-2"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  <label
                    htmlFor="my-drawer-2"
                    className="btn btn-primary drawer-button mb-5 lg:hidden"
                  >
                    <MenuOpenIcon />
                  </label>
                </div>

                <div className="drawer-side z-[10]">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>

                  <ul className="menu p-4 w-80 h-screen  text-base-content border-r">
                    {sideBarNavigation}
                    <div className="divider"></div>

                    <NavLink
                      to="/"
                      className="flex items-center gap-2 p-2 rounded-lg"
                    >
                      <HomeIcon />
                      Home
                    </NavLink>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex-1 lg:p-10 overflow-y-auto">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
