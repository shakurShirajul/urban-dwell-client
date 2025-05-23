import React, { useContext } from "react";
import logo from "../assets/images/logo/urbanDwell.png";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { AuthContext } from "../Providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import LoginIcon from "@mui/icons-material/Login";
import useAxiosSecure from "../hooks/userAxiosSecure";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Nav = () => {
  const { user, logOut } = useContext(AuthContext);
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
    <div className="fixed w-full bg-white/90 backdrop-blur shadow-md z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar bg-base-100 shadow-sm">
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
                  <h1 className="text-[#274c07]">Urban</h1>
                  <h1 className="text-[#173842]">Dwell</h1>
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
            ) : (
              <Link to="/login" className="">
                <button className="btn border">
                  <LoginIcon />
                  {/* <span className='text-base'>Login</span> */}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
