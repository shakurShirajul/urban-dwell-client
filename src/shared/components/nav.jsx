import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineBars3,
  HiOutlineBuildingOffice2,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineXMark,
} from "react-icons/hi2";
import logo from "@/assets/images/logo/urban-dwell.png";
import { AuthContext } from "@/shared/contexts/auth-context";
import useUserRole from "@/shared/hooks/use-user-role";

const navigation = [
  { label: "Apartments", hash: "apartments" },
  { label: "The building", hash: "building" },
  { label: "Resident offers", hash: "offers" },
  { label: "Visit", hash: "visit" },
];

const Nav = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const profileRef = useRef(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location]);

  useEffect(() => {
    const closeProfile = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeProfile);
    return () => document.removeEventListener("pointerdown", closeProfile);
  }, []);

  const { data: userRole } = useUserRole(user?.email);

  const dashboardPath =
    userRole?.user_role === "admin"
      ? "/dashboard/adminprofile"
      : "/dashboard/myprofile";

  const sectionLink = (hash) =>
    location.pathname === "/" ? `#${hash}` : `/#${hash}`;

  const navLinks = navigation.map((item) => (
    <li key={item.hash}>
      <a
        href={sectionLink(item.hash)}
        className="block rounded-full px-3 py-2 text-sm font-semibold text-base-content/70 transition-colors duration-200 hover:bg-primary/10 hover:text-primary focus-visible:outline-offset-1"
      >
        {item.label}
      </a>
    </li>
  ));

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-base-content/10 bg-base-100/90 backdrop-blur-xl">
      <nav className="app-shell flex h-20 items-center justify-between" aria-label="Primary navigation">
        <Link className="flex items-center gap-3" to="/" aria-label="Urban Dwell home">
          <img src={logo} alt="" width="48" height="48" className="size-11 object-contain" />
          <span className="leading-none">
            <span className="block font-urbanJungle text-xl text-primary">Urban</span>
            <span className="block font-urbanJungle text-xl text-secondary">Dwell</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">{navLinks}</ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid size-11 place-items-center rounded-full border border-base-content/10 bg-base-100 text-xl transition-colors duration-200 hover:bg-base-200"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <HiOutlineSun aria-hidden="true" /> : <HiOutlineMoon aria-hidden="true" />}
          </button>

          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                className="flex h-11 items-center gap-2 rounded-full border border-base-content/10 bg-base-100 p-1 pr-3 transition-colors duration-200 hover:bg-base-200"
                aria-label="Open account menu"
                aria-expanded={profileOpen}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    width="36"
                    height="36"
                    className="size-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-content">
                    {user.displayName?.charAt(0) || "U"}
                  </span>
                )}
                <span className="hidden max-w-28 truncate text-sm font-semibold sm:block">
                  {user.displayName || "Account"}
                </span>
              </button>

              {profileOpen ? (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 p-2 shadow-xl">
                  <div className="border-b border-base-content/10 px-3 py-3">
                    <p className="truncate font-semibold">{user.displayName || "Urban Dwell resident"}</p>
                    <p className="truncate text-sm text-base-content/55">{user.email}</p>
                  </div>
                  <Link
                    to={dashboardPath}
                    className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold hover:bg-base-200"
                  >
                    <HiOutlineBuildingOffice2 aria-hidden="true" className="text-lg" />
                    Open dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={logOut}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-error hover:bg-error/10"
                  >
                    <HiOutlineArrowRightOnRectangle aria-hidden="true" className="text-lg" />
                    Sign out
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden h-11 items-center rounded-full bg-secondary px-5 text-sm font-bold text-secondary-content transition-transform duration-200 hover:-translate-y-0.5 sm:flex"
            >
              Resident sign in
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="grid size-11 place-items-center rounded-full border border-base-content/10 text-2xl lg:hidden"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <HiOutlineXMark aria-hidden="true" /> : <HiOutlineBars3 aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div className="border-t border-base-content/10 bg-base-100 px-4 py-5 lg:hidden">
          <ul className="app-shell grid gap-1">{navLinks}</ul>
          {!user ? (
            <Link
              to="/login"
              className="app-shell mt-4 flex h-12 items-center justify-center rounded-full bg-secondary font-bold text-secondary-content"
            >
              Resident sign in
            </Link>
          ) : null}
        </div>
      ) : null}
    </header>
  );
};

export default Nav;
