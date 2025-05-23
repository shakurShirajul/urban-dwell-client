import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/images/logo/urbanDwell.png";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import LoginIcon from "@mui/icons-material/Login";
import useAxiosSecure from "../hooks/userAxiosSecure";
import AnchorLink from "react-anchor-link-smooth-scroll";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";

const Nav = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log("shakur");
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const axiosSecure = useAxiosSecure();

  const { data: userRole = [] } = useQuery({
    queryKey: ["role"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${user.email}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  const isRole = userRole.user_role;

  let dashboardNavigation = "/dashboard/myprofile";

  if (isRole === "admin") {
    dashboardNavigation = "/dashboard/adminprofile";
  }

  const handleLogOut = () => {
    logOut();
  };

  const NavBarLink = (
    <>
      <NavLink to="/">
        <AnchorLink href="#banner">Home</AnchorLink>
      </NavLink>
      <AnchorLink href="#ourApartments">Apartments</AnchorLink>
      <AnchorLink href="#about">About</AnchorLink>
      <AnchorLink href="#coupon">Coupon</AnchorLink>
      <AnchorLink href="#location">Location</AnchorLink>
    </>
  );

  return (
    // <div className="border-b z-50 font-roboto fixed w-full bg-white/90 backdrop-blur shadow-md">
    //   <div className="max-w-7xl mx-auto">
    //     <div className="navbar">
    //       <div className="navbar-start">
    //         <div className="dropdown">
    //           <div
    //             tabIndex={0}
    //             role="button"
    //             className="btn btn-ghost lg:hidden"
    //           >
    //             {/* Urban Dwell Logo */}
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="h-5 w-5"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth="2"
    //                 d="M4 6h16M4 12h8m-8 6h16"
    //               />
    //             </svg>
    //           </div>
    //           <ul
    //             tabIndex={0}
    //             className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-roboto "
    //           >
    //             {NavBarLink}
    //           </ul>
    //         </div>
    //         <div className="flex items-center justify-center">
    //           <div className="space-x-2 flex">
    //             <Link to="/" className="w-24">
    //               <img src={logo} alt="" className="h-full" />
    //             </Link>
    //             <Link to="/">
    //               <div className="text-3xl font-urbanJungle">
    //                 <h1 className="text-[#274c07]">Urban</h1>
    //                 <h1 className="text-[#173842]">Dwell</h1>
    //               </div>
    //             </Link>
    //           </div>
    //           <div>
    //             <div className="navbar-center hidden lg:flex">
    //               <ul className="menu menu-horizontal font-poppins text-xl uppercase font-semibold text-[#0066b1]">
    //                 {NavBarLink}
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="navbar-end">
    //         {user ? (
    //           <div>
    //             <div className="dropdown dropdown-end">
    //               <div
    //                 tabIndex={0}
    //                 role="button"
    //                 className="btn btn-ghost btn-circle avatar"
    //               >
    //                 <div className="w-14 rounded-full">
    //                   <img src={user.photoURL} />
    //                 </div>
    //               </div>
    //               <ul
    //                 tabIndex={0}
    //                 className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
    //               >
    //                 <li className="pointer-events-none select-none cursor-default">
    //                   <p className="font-semibold">{user.displayName}</p>
    //                 </li>
    //                 <li>
    //                   <Link to={dashboardNavigation}>Dashboard</Link>
    //                 </li>
    //                 <li>
    //                   <button onClick={handleLogOut}>Logout</button>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //         ) : (
    //           <Link to="/login" className="">
    //             <button className="btn border">
    //               <LoginIcon />
    //               {/* <span className='text-base'>Login</span> */}
    //             </button>
    //           </Link>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="fixed bg-base-100 w-full shadow-md z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar shadow-sm">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {NavBarLink}
              </ul>
            </div>
            <div className="space-x-2 flex">
              <Link to="/" className="w-24">
                <img src={logo} alt="" className="h-full" />
              </Link>
              <Link to="/">
                <div className="text-xl font-urbanJungle">
                  <h1 className="text-[#274c07] dark:text-[#9CCC65]">Urban</h1>
                  <h1 className="text-[#173842] dark:text-[#4FC3F7]">Dwell</h1>
                </div>
              </Link>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 flex gap-5 text-xl font-roboto font-medium">
              {NavBarLink}
            </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="flex gap-5 items-center justify-center">
                <div>
                  <label className="swap swap-rotate">
                    <input
                      type="checkbox"
                      onChange={toggleTheme}
                      checked={theme === "dark"}
                    />

                    {/* Sun icon */}
                    <svg
                      className="swap-on fill-current w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>

                    {/* Moon icon */}
                    <svg
                      className="swap-off fill-current w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.09 9.79z" />
                    </svg>
                  </label>
                </div>
                <div>
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-14 rounded-full">
                        <img src={user.photoURL} />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li className="pointer-events-none select-none cursor-default">
                        <p className="font-semibold">{user.displayName}</p>
                      </li>
                      <li>
                        <Link to={dashboardNavigation}>Dashboard</Link>
                      </li>
                      <li>
                        <button onClick={handleLogOut}>Logout</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex gap-5">
                  <label className="swap swap-rotate">
                    <input
                      type="checkbox"
                      onChange={toggleTheme}
                      checked={theme === "dark"}
                    />

                    {/* Sun icon */}
                    <svg
                      className="swap-on fill-current w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>

                    {/* Moon icon */}
                    <svg
                      className="swap-off fill-current w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010.09 9.79z" />
                    </svg>
                  </label>
                  <Link to="/login" className="">
                    <button className="btn border">
                      <LoginIcon />
                      {/* <span className='text-base'>Login</span> */}
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
